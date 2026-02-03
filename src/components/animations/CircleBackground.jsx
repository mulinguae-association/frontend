import React, { useMemo } from "react";
import "../../globalStyles/animations/circle-background.scss";

const CircleBackground = ({ count = 40, className = "" }) => {
  // Memoize random delays for each circle for consistent animation
  const delays = useMemo(
    () => Array.from({ length: count }, () => Math.random() * 2),
    [count],
  );
  return (
    <div className={`circle-bg-container ${className}`.trim()}>
      {[...Array(count)].map((_, index) => (
        <div className="circle-container" key={index}>
          <div
            className="circle"
            style={{
              animationDelay: `${delays[index]}s`,
              willChange: "transform, opacity",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default CircleBackground;
