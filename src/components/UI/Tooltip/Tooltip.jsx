import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Tooltip.scss";
import { FaInfoCircle } from "react-icons/fa";
import i18next from "i18next";

/**
 * A reusable tooltip component that detects available space and positions itself accordingly
 */
const Tooltip = ({
  children,
  icon = <FaInfoCircle />,
  position = "top",
  className = "",
  trigger = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const isRTL = ["ar", "ur"].includes(i18next.language);

  // Calculate the best position for the tooltip based on available space
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current || !isVisible) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space in each direction
    const spaceTop = triggerRect.top;
    const spaceRight = viewportWidth - triggerRect.right;
    const spaceBottom = viewportHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;

    // Determine the best position based on available space and preferred position
    let bestPosition = position;

    // Check if the preferred position has enough space
    switch (position) {
      case "top":
        if (spaceTop < tooltipRect.height + 8) {
          // Not enough space on top, find alternative
          bestPosition =
            spaceBottom >= tooltipRect.height + 8
              ? "bottom"
              : spaceRight >= tooltipRect.width + 8
              ? "right"
              : "left";
        }
        break;
      case "right":
        if (spaceRight < tooltipRect.width + 8) {
          // Not enough space on right, find alternative
          bestPosition =
            spaceLeft >= tooltipRect.width + 8
              ? "left"
              : spaceTop >= tooltipRect.height + 8
              ? "top"
              : "bottom";
        }
        break;
      case "bottom":
        if (spaceBottom < tooltipRect.height + 8) {
          // Not enough space on bottom, find alternative
          bestPosition =
            spaceTop >= tooltipRect.height + 8
              ? "top"
              : spaceRight >= tooltipRect.width + 8
              ? "right"
              : "left";
        }
        break;
      case "left":
        if (spaceLeft < tooltipRect.width + 8) {
          // Not enough space on left, find alternative
          bestPosition =
            spaceRight >= tooltipRect.width + 8
              ? "right"
              : spaceTop >= tooltipRect.height + 8
              ? "top"
              : "bottom";
        }
        break;
      default:
        break;
    }

    // Handle RTL languages by swapping left and right if needed
    if (isRTL && (bestPosition === "left" || bestPosition === "right")) {
      bestPosition = bestPosition === "left" ? "right" : "left";
    }

    setTooltipPosition(bestPosition);
  }, [isVisible, position, isRTL]);

  // Recalculate position when tooltip becomes visible or window is resized
  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    if (isVisible) {
      calculatePosition();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className={`tooltip-container ${className}`} ref={triggerRef}>
      <div
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        {trigger || icon}
      </div>

      {isVisible && (
        <div
          className={`tooltip-content ${tooltipPosition}`}
          ref={tooltipRef}
          style={{ zIndex: 9999 }} /* Ensure it appears above everything */
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
