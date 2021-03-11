import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPageView from './Views/LandingPageView';
import './LandingPage.scss';

export default function LandingPage() {

    return (
        <Router>
            <LandingPageView />
        </Router>
    )
}
