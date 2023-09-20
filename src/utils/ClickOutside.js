// utils/clickOutside.js
import { useEffect, useRef } from "react";

export function useClickOutside(callback) {
  const ref = useRef(null);

  const handleClick = (e) => {
    setTimeout(() => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }, 150);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return ref;
}
// end clickOutside function
