import { useContext, useEffect, useCallback, useMemo } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";

const useLoader = () => {
  const { isAppLoading, setIsAppLoading } = useContext(AppContext);

  // Define handleLoad as a memoized callback
  const handleLoad = useCallback(() => {
    setIsAppLoading(false);
  }, [setIsAppLoading]);

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      document.addEventListener("readystatechange", handleLoad);
    }

    return () => {
      document.removeEventListener("readystatechange", handleLoad);
    };
  }, [handleLoad]);

  // Memoize isLoading value
  const memoizedIsLoading = useMemo(() => isAppLoading, [isAppLoading]);

  return memoizedIsLoading;
};

export default useLoader;
