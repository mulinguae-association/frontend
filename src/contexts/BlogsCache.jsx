import React, { createContext, useContext } from "react";

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const clearCache = () => {};

  return (
    <CacheContext.Provider value={{ clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);