import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { notifyError } from "../components/Notify";
import handleError from "../utils/handleError";
import { fetchUserProfile } from "../apis/auth-api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const { data: userData } = useQuery("userProfile", fetchUserProfile, {
    retry: false, // Don't retry on failure
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    onError: (err) => {
      setIsAuth(false);
      if (err.response?.status === 401) {
        if (err.response.data.message === "Token Expired") {
          // Only show error if the user is already authenticated
          notifyError('Your session has expired. Please log in again.');
        }
        setIsAuth(false);

      } else {
        notifyError(handleError(err));
      }
    },
    onSuccess: (data) => {
      setIsAuth(true);
    },
    onSettled: () => {
      console.log('Query has settled');
    }
  });

  useEffect(() => {
    setIsAuth(!!userData)
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
