import { useState, useEffect } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      document.addEventListener('readystatechange', handleLoad);
    }

    return () => {
      document.removeEventListener('readystatechange', handleLoad);
    };
  }, []);
  return isLoading;
};
export default useLoader;