import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { PublicRoutes } from './../../../routes.const';
import './LandingPage.scss';
import LandingPageView from './Views/LandingPageView';


export default function LandingPage() {
    const history = useHistory();

    const handleEnterUserPage = () => {
        history.push(PublicRoutes.USER_DASHBOARD);
    }

    return (
        // <Router>
        <LandingPageView handleEnterUserPage={handleEnterUserPage} />
        // </Router >
    )
}
