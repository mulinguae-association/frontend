import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import i18next from "i18next";
import { isAdminRole } from "../utils/isAdminRole";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { userData, isAuth, authLoading } = useAuth();

  // Wait until the profile query settles before deciding, so an already-logged-in
  // user is never bounced to login while the profile is still loading.
  if (authLoading) {
    return null;
  }

  const isLoggedIn = Boolean(userData) && isAuth;

  if (!isLoggedIn || (isAdmin && !isAdminRole(userData?.role))) {
    return <Navigate to={`/${i18next.language}/login`} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;