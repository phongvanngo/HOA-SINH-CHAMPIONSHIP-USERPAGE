import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import UserDashboardView from './Views/UserDashboardView';
import './UserDashboard.scss'
import { logout } from './../../../features/userLogin/userLoginSlice';
import { useDispatch } from 'react-redux';

export default function UserDashboard() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('log out');
        dispatch(logout());
    }

    return (
        <UserDashboardView handleLogout={handleLogout} />
    )
}
