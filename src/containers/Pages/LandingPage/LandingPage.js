import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PublicRoutes } from './../../../routes.const';
import './LandingPage.scss';
import LandingPageView from './Views/LandingPageView';
import Footer from './../../User/Footer';


export default function LandingPage() {
    const history = useHistory();

    const handleEnterUserPage = () => {
        history.push(PublicRoutes.USER_DASHBOARD);
    }

    return (
        // <Router>
        <React.Fragment>
            <LandingPageView handleEnterUserPage={handleEnterUserPage} />
            <Footer />
        </React.Fragment>
        // </Router >
    )
}
