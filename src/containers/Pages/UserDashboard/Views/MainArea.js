import React, { lazy } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { UserDashboardRoutes, PublicRoutes } from './../../../../routes.const';
import UserDashboardView from './UserDashboardView';

const Homepage = lazy(() => import('../../Homepage/Homepage'));
const Leaderboard = lazy(() => import('./../../Leaderboard/Leaderboard'));
const UserSignIn = lazy(() => import('./../../UserSignIn/UserSignIn'));
const ContactPage = lazy(() => import('./../../Contact/Contact'));


export default function MainArea() {
    const match = useRouteMatch();
    const { HOMEPAGE, LEADERBOARD, TEST, USER_LOGIN, CONTACT } = UserDashboardRoutes;
    return (
        <div>
            <Switch>
                <Route path={HOMEPAGE} component={Homepage} />
                <Route path={LEADERBOARD} component={Leaderboard} />
                <Route path={USER_LOGIN} component={UserSignIn} />
                <Route path={CONTACT} component={ContactPage} />
                <Route component={Homepage} />
                {/* <Route exact path={PublicRoutes.USER_DASHBOARD} component={Homepage} /> */}
                {/* <Redirect exact from={match.url} to={HOMEPAGE} /> */}
                {/* <Redirect exact from={match.url} to={HOMEPAGE} /> */}
            </Switch>
        </div>
    )
}
