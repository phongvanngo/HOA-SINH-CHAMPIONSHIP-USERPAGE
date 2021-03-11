import React, { lazy } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { UserDashboardRoutes } from './../../../../routes.const';
import UserDashboardView from './UserDashboardView';

const Homepage = lazy(() => import('../../Homepage/Homepage'));


export default function MainArea() {
    const match = useRouteMatch();
    const { HOMEPAGE } = UserDashboardRoutes;
    return (
        <div>
            <Redirect exact from={match.url} to={HOMEPAGE} />
            <Route path={HOMEPAGE} component={Homepage} />

        </div>
    )
}
