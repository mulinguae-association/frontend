import { useContext, useEffect, useCallback, useMemo } from "react";
import { AppContext } from "../../contexts/AppContext";

const useLoader = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);

  // Define handleLoad as a memoized callback
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    const onLoad = () => {
      handleLoad();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      document.addEventListener("readystatechange", onLoad);
    }

    return () => {
      document.removeEventListener("readystatechange", onLoad);
    };
  }, [handleLoad]);

  // Memoize isLoading value
  const memoizedIsLoading = useMemo(() => isLoading, [isLoading]);

  return memoizedIsLoading;
};

export default useLoader;
