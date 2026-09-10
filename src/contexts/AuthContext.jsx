import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { notifyError } from "../components/Notify";
import handleError from "../utils/handleError";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation("global");
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const fetchUserProfile = async () => {
    const { fetchUserProfile } = await import("../apis/auth-api");
    return fetchUserProfile();
  };
  const { isLoading: authLoading } = useQuery("userProfile", fetchUserProfile, {
    retry: false, // Don't retry on failure
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    onError: (err) => {
      setIsAuth(false);
      setUserData(null); // Clear userData on error
      if (err.response?.status === 401) {
        if (err.response.data.message === "Token Expired") {
          notifyError(t("app.sessionExpired"));
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
    <AuthContext.Provider
      value={{ userData, isAuth, setIsAuth, setUserData, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
