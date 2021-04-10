import React, { lazy, Suspense } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import PageLoaderRouter from './common/component/PageLoader/PageLoaderRouter';
import { PublicRoutes, LandingPageRoutes } from './routes.const';

const Dashboard = lazy(() => import('./containers/Pages/Dashboard/Dashboard'));
const AdminSignIn = lazy(() => import('./containers/Pages/AdminSignIn/AdminSignIn'));
const NotFound = lazy(() => import('./containers/Pages/NotFound/NotFound'));
const LandingPage = lazy(() => import('./containers/Pages/LandingPage/LandingPage'));
const UserExam = lazy(() => import('./features/userExam/UserExam'));
const RunningStation = lazy(() => import('./features/RunningStation/RunningStation'));

const { HOMEPAGE, LEADERBOARD, USER_LOGIN, CONTACT, USER } = LandingPageRoutes;

function PrivateRoute({ children, ...rest }) {
    let location = useLocation();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    if (isLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: PublicRoutes.ADMIN_SIGNIN,
                state: { from: location },
            }}
        />
    )
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<PageLoaderRouter />}>
            <Router>
                <Switch>
                    <PrivateRoute path={PublicRoutes.ADMIN_DASHBOARD}>
                        <Dashboard />
                    </PrivateRoute>
                    <Route path={PublicRoutes.ADMIN_SIGNIN} component={AdminSignIn} exact={true} />
                    <Route path={PublicRoutes.TEST} component={UserExam} />
                    <Route path={PublicRoutes.RUNNING_STATION} component={RunningStation} />
                    <Route path={HOMEPAGE} component={LandingPage} />
                    <Route path={USER_LOGIN} component={LandingPage} />
                    <Route path={USER} component={LandingPage} />
                    <Route path={LEADERBOARD} component={LandingPage} />
                    <Route path={CONTACT} component={LandingPage} />
                    {/* <Route path={PublicRoutes.LANDINGPAGE} component={LandingPage} /> */}
                    <Redirect exact from={PublicRoutes.LANDINGPAGE} to={LandingPageRoutes.HOMEPAGE} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>

    )
}