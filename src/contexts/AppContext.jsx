import React, { createContext, useState, useContext } from 'react';
const NotificationPopup = React.lazy(() => import('../components/HelperComponents/NotificationPopup'));

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBtnLoading, setIsBtnLoading] = useState({});
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [notificationPopup, setNotificationPopup] = useState({ message: '' });
  // Function to set loading state for a specific button
  const setButtonLoading = (buttonKey, isLoading) => {
    setIsBtnLoading((prevState) => ({
      ...prevState,
      [buttonKey]: isLoading
    }));
  };
  // Create an object containing the values to be exposed in the context
  const contextValues = {
    isAppLoading,
    setIsAppLoading,
    notificationPopup,
    setNotificationPopup,
    isBtnLoading,
    setButtonLoading
  };
  return (
    <AppContext.Provider value={contextValues}>
      {children}
      {notificationPopup && (
        <React.Suspense>
          <NotificationPopup
            message={notificationPopup.message}
            setNotification={setNotificationPopup}
          />
        </React.Suspense>
      )}
    </AppContext.Provider>
  );
};
export const useGlobal = () => useContext(AppContext);
