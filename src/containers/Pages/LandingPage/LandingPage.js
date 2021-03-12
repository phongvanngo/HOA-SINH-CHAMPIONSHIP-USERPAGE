import React, { useEffect } from 'react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import LandingPageView from './Views/LandingPageView';
import './LandingPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PublicRoutes } from './../../../routes.const';


export default function LandingPage() {
    const history = useHistory();

    const handleEnterUserPage = () => {
        history.push(PublicRoutes.USER_DASHBOARD);
    }

    return (
        <Router>
            <LandingPageView handleEnterUserPage={handleEnterUserPage} />
        </Router>
    )
}
