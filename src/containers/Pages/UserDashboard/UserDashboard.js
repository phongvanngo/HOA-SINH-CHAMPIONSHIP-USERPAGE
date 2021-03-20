import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './../../../features/userLogin/userLoginSlice';
import './UserDashboard.scss';
import UserDashboardView from './Views/UserDashboardView';

export default function UserDashboard() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <UserDashboardView handleLogout={handleLogout} />
    )
}
