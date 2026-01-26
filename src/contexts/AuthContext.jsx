import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { notifyError } from "../components/Notify";
import handleError from "../utils/handleError";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const fetchUserProfile = async () => {
    const { fetchUserProfile } = await import("../apis/auth-api");
    return fetchUserProfile();
  };
  useQuery("userProfile", fetchUserProfile, {
    retry: false, // Don't retry on failure
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    onError: (err) => {
      setIsAuth(false);
      setUserData(null); // Clear userData on error
      if (err.response?.status === 401) {
        if (err.response.data.message === "Token Expired") {
          notifyError("Your session has expired. Please log in again.");
        }
      } else {
        notifyError(handleError(err));
      }
    },
    onSuccess: (data) => {
      setIsAuth(true);
      setUserData(data);
    },
  });

  return (
    <AuthContext.Provider value={{ userData, isAuth, setIsAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
