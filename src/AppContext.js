import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);


  // Create an object containing the values to be exposed in the context
  const contextValues = {
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
