import React, { createContext, useRef, useContext } from 'react';
import { CellMeasurerCache } from 'react-virtualized';

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    fixedHeight: false,
  }));
  const clearCache = () => {
    cache.current.clearAll(); // Clear the cache
  };

  return (
    <CacheContext.Provider value={{ cache: cache.current, clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
