import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import i18next from 'i18next';

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const { userData, isAuth } = useAuth();

    if ((!userData && !isAuth) || (isAdmin && userData?.role !== "admin")) {
        return <Navigate to={`/${i18next.language}/login`} replace={true} />
    }
    return children

};

export default ProtectedRoute;