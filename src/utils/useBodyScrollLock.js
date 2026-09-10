import { useEffect } from "react";

/**
 * Locks/unlocks body scrolling based on the given flag.
 *
 * When `enabled` is true, the page behind an open overlay/modal/chat is
 * prevented from scrolling. Scroll is restored when `enabled` becomes false
 * or when the component using this hook unmounts.
 *
 * @param {boolean} enabled - Whether body scroll should be locked.
 */
const useBodyScrollLock = (enabled) => {
  useEffect(() => {
    const body = document.body;

    if (enabled) {
      body.style.overflow = "hidden";
    } else {
      body.style.removeProperty("overflow");
    }

    return () => {
      body.style.removeProperty("overflow");
    };
  }, [enabled]);
};

export default useBodyScrollLock;
