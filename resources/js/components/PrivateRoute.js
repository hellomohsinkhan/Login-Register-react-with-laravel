import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from './checkAuth';

const PrivateRoute = () => {
    const auth = localStorage.getItem('token'); 
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;