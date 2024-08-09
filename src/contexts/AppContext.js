import React, { createContext, useState, useContext } from 'react';
import { fetchTeachers } from '../apis/apiUtility';
import NotificationPopup from '../components/HelperComponents/NotificationPopup';
import { useQuery } from 'react-query';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBtnLoading, setIsBtnLoading] = useState({});
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState({ message: '' });
  // Function to set loading state for a specific button
  const setButtonLoading = (buttonKey, isLoading) => {
    setIsBtnLoading((prevState) => ({
      ...prevState,
      [buttonKey]: isLoading
    }));
  };
  const { data, isLoading, isError, error } = useQuery(["getTeachers"], () => fetchTeachers(), {
    cacheTime: Infinity
  });
  // Create an object containing the values to be exposed in the context
  const contextValues = {
    isAppLoading,
    setIsAppLoading,
    teachers: data,
    isLoading,
    error,
    isError,
    notificationPopup,
    setNotificationPopup,
    isBtnLoading,
    setButtonLoading
  };
  return (
    <AppContext.Provider value={contextValues}>
      {children}
      {notificationPopup && (
        <NotificationPopup
          message={notificationPopup.message}
          setNotification={setNotificationPopup}
        />
      )}
    </AppContext.Provider>
  );
};
export const useGlobal = () => useContext(AppContext);
