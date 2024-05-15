import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn, settoken } from './redux/LoginSlice';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = useSelector(selectIsLoggedIn);

    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }
    // return <Outlet />;
    return token ? <Outlet /> : <Navigate to="/login" replace />
};

export default ProtectedRoute