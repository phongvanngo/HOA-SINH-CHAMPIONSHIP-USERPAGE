import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { LandingPageRoutes } from './../../../../routes.const';


const Homepage = lazy(() => import('./Homepage/Homepage'));
const Leaderboard = lazy(() => import('./Leaderboard/Leaderboard'));
const UserSignIn = lazy(() => import('./UserSignIn/UserSignIn'));
const ContactPage = lazy(() => import('./Contact/Contact'));


export default function MainArea() {
    const match = useRouteMatch();
    const { HOMEPAGE, LEADERBOARD, TEST, USER_LOGIN, CONTACT, USER, LANDINGPAGE } = LandingPageRoutes;
    return (
        <div>
            <Route path={HOMEPAGE} component={Homepage} />
            <Route path={LEADERBOARD} component={Leaderboard} />
            <Route path={USER_LOGIN} component={UserSignIn} />
            <Route path={CONTACT} component={ContactPage} />
        </div>
    )
}
