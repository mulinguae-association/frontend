import { useEffect } from "react";

export default function useLockBodyScroll(lock) {
  useEffect(() => {
    if (lock) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return undefined;
    B;
  }, [lock]);
}
