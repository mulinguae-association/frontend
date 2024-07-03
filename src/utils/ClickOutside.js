import { useEffect, useRef, useCallback } from "react";

export function useClickOutside(callback) {
  const ref = useRef(null);

  const handleClick = useCallback((e) => {
    setTimeout(() => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }, 150);
  }, [callback]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return ref;
}
// end clickOutside function
