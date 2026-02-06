import { useEffect, useRef, useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import "./IntroVideoModal.scss";
import { useTranslation } from "react-i18next";
import { resolveForDevice } from "../../utils/videoUtils";
import IntroVideoPlayerVjs from "./IntroVideoPlayerVjs";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const IntroVideoModal = ({
  show,
  onClose,
  videoUrl,
  captionTracks = {},
  captions = {},
}) => {
  const playerRef = useRef(null);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [blobTracks, setBlobTracks] = useState({});
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState(videoUrl || "");

  const captionKey = useMemo(
    () => JSON.stringify(captionTracks || {}),
    [captionTracks],
  );

  // Resolve device-appropriate URL
  useEffect(() => {
    if (!show || !videoUrl) return;
    try {
      const deviceWidth = Math.max(window.innerWidth || 0, 320);
      const dpr = window.devicePixelRatio || 1;
      const newUrl = resolveForDevice(videoUrl, deviceWidth, dpr);
      setResolvedVideoUrl(newUrl);
    } catch (e) {
      setResolvedVideoUrl(videoUrl);
    }
  }, [show, videoUrl]);

  // Fetch caption tracks as blobs to avoid CORS
  useEffect(() => {
    if (!show) return;
    let cancelled = false;
    const created = [];

    const load = async () => {
      const entries = Object.entries(captionTracks || {});
      for (const [srclang, src] of entries) {
        try {
          const res = await fetch(src, { cache: "no-cache" });
          if (!res.ok)
            throw new Error(`Failed to fetch ${src} status:${res.status}`);
          const text = await res.text();
          const blob = new Blob([text], { type: "text/vtt" });
          const url = URL.createObjectURL(blob);
          created.push(url);
          if (!cancelled) setBlobTracks((s) => ({ ...s, [srclang]: url }));
        } catch (e) {
          // ignore
        }
      }
    };

    load();
    return () => {
      cancelled = true;
      created.forEach((u) => u && URL.revokeObjectURL(u));
      setBlobTracks({});
    };
  }, [show, captionKey, captionTracks]);

  // Play/pause for modal open/close (supports VideoJS wrapper API)
  useEffect(() => {
    const internalPlayer =
      playerRef.current &&
      (playerRef.current.getPlayer
        ? playerRef.current.getPlayer()
        : playerRef.current.getInternalPlayer
          ? playerRef.current.getInternalPlayer()
          : playerRef.current);
    if (!internalPlayer) return;
    if (show) {
      try {
        const p = internalPlayer.play && internalPlayer.play();
        if (p && p.catch) p.catch(() => {});
      } catch (e) {}
    } else {
      try {
        internalPlayer.pause && internalPlayer.pause();
        if (internalPlayer.currentTime !== undefined)
          internalPlayer.currentTime = 0;
      } catch (e) {}
    }
  }, [show]);

  const handleEnded = () => onClose && onClose();
  const handleClose = () => {
    try {
      const p =
        playerRef.current &&
        (playerRef.current.getInternalPlayer
          ? playerRef.current.getInternalPlayer()
          : playerRef.current);
      p && p.pause && p.pause();
      if (p && p.currentTime !== undefined) p.currentTime = 0;
    } catch (e) {}
    onClose && onClose();
  };

  useLockBodyScroll(show);
  if (!show) return null;

  const tracksForPlayer =
    Object.entries(blobTracks).length > 0
      ? Object.entries(blobTracks).map(([srclang, src]) => ({
          kind: "subtitles",
          src,
          srcLang: srclang,
          label: srclang,
          default: srclang === lang,
        }))
      : Object.entries(captionTracks).map(([srclang, src]) => ({
          kind: "subtitles",
          src,
          srcLang: srclang,
          label: srclang,
          default: srclang === lang,
        }));

  return (
    <div className="intro-video-overlay" role="dialog" aria-modal="true">
      <div className="intro-video-backdrop" onClick={handleClose} />
      <div className="intro-video-container">
        <button
          className="intro-close"
          onClick={handleClose}
          aria-label="Close intro"
        >
          <FaTimes size={28} />
        </button>
        <div className="intro-video-wrap">
          <div className="react-player-wrap">
            <IntroVideoPlayerVjs
              ref={playerRef}
              url={resolvedVideoUrl || videoUrl}
              playing={show}
              controls
              onEnded={handleEnded}
              tracks={tracksForPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroVideoModal;
