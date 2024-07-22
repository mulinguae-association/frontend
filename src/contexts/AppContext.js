import React, { createContext, useCallback, useState } from 'react';
import { fetchTeachers } from '../utils/apiUtility';
import { useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [notificationPopup, setNotificationPopup] = useState(null);
  // Function to set loading state for a specific button
  const setButtonLoading = (buttonKey, isLoading) => {
    setIsBtnLoading((prevState) => ({
      ...prevState,
      [buttonKey]: isLoading,
    }));
  };
  const getTeachers = useCallback(async () => {
    try {
      const fetchedTeachers = await fetchTeachers();
      setTeachers(fetchedTeachers);
    } catch (err) {
      console.log(err);
    }
  }, []);
  // Create an object containing the values to be exposed in the context
  const contextValues = {
    isLoading,
    setIsLoading,
    teachers,
    setTeachers,
    getTeachers,
    notificationPopup,
    setNotificationPopup,
    isBtnLoading,
    setButtonLoading
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobal = () => useContext(AppContext);
