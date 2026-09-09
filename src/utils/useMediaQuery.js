import { useEffect, useState } from "react";

/**
 * Reactively evaluates a CSS media query and keeps the result in sync when
 * the viewport changes (resize, orientation change, etc.).
 *
 * Shared util so components don't have to repeat the matchMedia boilerplate.
 *
 * @param {string} query - A CSS media query string, e.g. "(max-width: 600px)".
 * @returns {boolean} Whether the media query currently matches.
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
