import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import i18next from "i18next";
import Loader from "../components/UI/Loader/index.jsx";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { userData, isAuth, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (
    (!userData && !isAuth) ||
    (isAdmin && !["admin", "superadmin"].includes(userData?.role))
  ) {
    return <Navigate to={`/${i18next.language}/login`} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
