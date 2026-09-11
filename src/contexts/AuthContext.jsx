import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { notifyError } from "../components/Notify";
import handleError from "../utils/handleError";
import { getSession, setSession, subscribeSession } from "./sessionStore.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation("global");
  const [session, setSessionState] = useState(getSession);

  const fetchUserProfile = async () => {
    const { fetchUserProfile } = await import("../apis/auth-api.js");
    return fetchUserProfile();
  };

  const { isLoading: authLoading } = useQuery("userProfile", fetchUserProfile, {
    retry: false,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    onError: (err) => {
      setSession({ isAuth: false, userData: null });
      if (err.response?.status === 401) {
        if (err.response.data.message === "Token Expired") {
          notifyError(t("app.sessionExpired"));
        }
      } else {
        notifyError(handleError(err));
      }
    },
    onSuccess: (data) => {
      setSession({ isAuth: true, userData: data });
    },
  });

  useEffect(() => subscribeSession(setSessionState), []);

  return (
    <AuthContext.Provider
      value={{
        userData: session.userData,
        isAuth: session.isAuth,
        setIsAuth: (v) => setSession({ isAuth: v }),
        setUserData: (d) => setSession({ userData: d }),
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);