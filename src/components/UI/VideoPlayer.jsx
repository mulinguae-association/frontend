import React, { useMemo } from "react";

const VideoPlayer = ({ id, videoId, title, description, autoplay = false }) => {
  const src = useMemo(() => {
    const base = `https://www.youtube.com/embed/${videoId}`;
    const params = ["rel=0"];
    if (autoplay) {
      // autoplay often requires muted to work in modern browsers
      params.push("autoplay=1", "mute=0");
    }
    return `${base}?${params.join("&")}`;
  }, [videoId, autoplay]);

  return (
    <div
      id={id}
      style={{ maxWidth: 960, margin: "1.25rem auto" }}
      tabIndex={-1}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          aspectRatio: "16/9",
          maxHeight: "calc(100vh - 120px)",
        }}
      >
        <iframe
          src={src}
          title={title || "video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {title && <h3 style={{ marginTop: 10, color: "#fff" }}>{title}</h3>}
      {description && (
        <p style={{ marginTop: 6, color: "#fff" }}>{description}</p>
      )}
    </div>
  );
};

export default VideoPlayer;
