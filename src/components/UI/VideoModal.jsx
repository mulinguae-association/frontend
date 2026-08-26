import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoModal = ({ show, onClose, videoId, title, autoplay = true }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (show) {
      const prev = document.activeElement;
      containerRef.current && containerRef.current.focus();
      return () => prev && prev.focus && prev.focus();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 10000 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
        }}
      />

      <div
        ref={containerRef}
        tabIndex={-1}
        style={{
          position: "relative",
          width: isMobile ? "100%" : "96%",
          maxWidth: isMobile ? "100%" : 980,
          height: isMobile ? "100vh" : "auto",
          margin: isMobile ? "0 auto" : "3rem auto",
          zIndex: 10001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "0 0 40px 0" : 0,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: "absolute",
            right: 8,
            top: isMobile ? 8 : -36,
            zIndex: 10002,
            background: "transparent",
            color: "#fff",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div
          style={{
            background: "#000",
            borderRadius: isMobile ? 0 : 8,
            overflow: "hidden",
            width: "100%",
            maxHeight: isMobile ? "100vh" : "calc(100vh - 120px)",
          }}
        >
          <VideoPlayer videoId={videoId} title={title} autoplay={autoplay} />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
