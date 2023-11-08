import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import i18next from 'i18next';

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const { userData, isAuth } = useAuth()
    let location = useLocation();

    if (isAdmin) {
        if (isAuth && userData.role !== "admin") {
            return <Navigate to={`/${i18next.language}/login`} state={{ from: location }} replace />
        }
    }
    if (!isAdmin) {
        if (!isAuth) {
            return <Navigate to={`/${i18next.language}/login`} state={{ from: location }} replace />
        }
    }
    return children

};

export default ProtectedRoute;