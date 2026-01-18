import React, { useEffect, useRef, useImperativeHandle } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// VideoJS React component based on the snippet provided.
// Supports either `options` + `onReady` API or simple props: url, tracks, playing, controls, onEnded.
const VideoJS = React.forwardRef(function VideoJS(props, ref) {
  const {
    options: optionsProp,
    onReady,
    url,
    tracks = [],
    playing,
    onEnded,
  } = props;
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const getType = (u) => {
    if (!u) return "video/mp4";
    if (/\.m3u8(\?|$)/i.test(u)) return "application/x-mpegURL";
    if (/\.mpd(\?|$)/i.test(u)) return "application/dash+xml";
    return "video/mp4";
  };

  useEffect(() => {
    const options = optionsProp || {
      controls: true,
      autoplay: false,
      preload: "auto",
      fluid: true,
      sources: url ? [{ src: url, type: getType(url) }] : [],
    };

    const mountNode = videoRef.current;

    if (!playerRef.current && mountNode) {
      const videoElement = document.createElement("video");
      videoElement.className = "video-js vjs-big-play-centered";
      videoElement.setAttribute("playsinline", "");
      mountNode.appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, function () {
        videojs.log("Player is ready");
        this.on("ended", () => onEnded && onEnded());
        onReady && onReady(this);
        try {
          if (typeof this.httpSourceSelector === "function")
            this.httpSourceSelector({ default: "auto" });
        } catch (e) {}
      });
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      if (options.sources && options.sources.length)
        player.src(options.sources);
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
      if (mountNode) mountNode.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsProp, url]);

  // update tracks when they change
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      // remove existing remote tracks
      const existing = p.remoteTextTracks
        ? Array.from(p.remoteTextTracks())
        : [];
      existing.forEach((t) => p.removeRemoteTextTrack(t));
    } catch (e) {}
    tracks.forEach((tr) => {
      try {
        p.addRemoteTextTrack(
          {
            kind: tr.kind,
            src: tr.src,
            srclang: tr.srcLang,
            label: tr.label,
            default: tr.default,
          },
          false
        );
      } catch (e) {}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  // play/pause control
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      p.play().catch(() => {});
    } else {
      p.pause();
    }
  }, [playing]);

  useImperativeHandle(ref, () => ({
    getPlayer: () => playerRef.current,
    play: () => playerRef.current && playerRef.current.play(),
    pause: () => playerRef.current && playerRef.current.pause(),
  }));

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
});

export default VideoJS;
