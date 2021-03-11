import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import UserDashboardView from './Views/UserDashboardView';
import './UserDashboard.scss'

export default function UserDashboard() {

    return (
        <Router>
            <UserDashboardView />
        </Router>
    )
}
