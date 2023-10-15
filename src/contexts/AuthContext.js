// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { notifyError } from "../components/Notify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!userData) {
          const res = await axios.get('/api/auth/profile')
          if (res.status === 200) {
            console.log(userData)
            setUserData(res.data);
          }
          if (res.status === 401) {
            setUserData(null)
            setIsAuth(false)
          }
        }
        setIsAuth(!!userData);
      }
      catch (err) {
        console.log(err)
        if (err.response?.status === 401) {
          notifyError(err.response.data.message)
          setIsAuth(false)
        }
      }
    })()
  }, [userData]);
  return (
    <AuthContext.Provider value={{ userData, setUserData, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
