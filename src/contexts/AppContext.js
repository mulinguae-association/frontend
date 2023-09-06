import React, { createContext, useState } from 'react';
import { fetchTeachers } from '../utils/apiUtility';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  console.log(teachers)
  const getTeachers = async () => {
    try {
      const fetchedTeachers = await fetchTeachers();
      setTeachers(fetchedTeachers);
    } catch (err) {
      console.log(err);
    }
  };
  // Create an object containing the values to be exposed in the context
  const contextValues = {
    isLoading,
    setIsLoading,
    teachers,
    setTeachers,
    getTeachers
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
