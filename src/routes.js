import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { PublicRoutes, LandingPageRoutes } from './routes.const';

const Dashboard = lazy(() => import('./containers/Pages/Dashboard/Dashboard'));
const AdminSignIn = lazy(() => import('./containers/Pages/AdminSignIn/AdminSignIn'));
const NotFound = lazy(() => import('./containers/Pages/NotFound/NotFound'));
const UserDashboard = lazy(() => import('./containers/Pages/UserDashboard/UserDashboard'));
const LandingPage = lazy(() => import('./containers/Pages/LandingPage/LandingPage'));
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
function PrivateRouteUser({ children, ...rest }) {
    let location = useLocation();
    const hasLoggedIn = useSelector(state => state.userLogin.hasLoggedIn);
    if (hasLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: LandingPageRoutes.USER_LOGIN,
                state: { from: location },
            }}
        />
    )
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Router>
                <Switch>
                    {/* <Redirect exact from="/" to={PublicRoutes.USER_DASHBOARD} /> */}
                    <PrivateRoute path={PublicRoutes.ADMIN_DASHBOARD}>
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRouteUser path={PublicRoutes.USER_DASHBOARD}>
                        <UserDashboard />
                    </PrivateRouteUser>
                    <Route path={PublicRoutes.ADMIN_SIGNIN} component={AdminSignIn} exact={true} />
                    <Route path={PublicRoutes.LANDINGPAGE} component={LandingPage} exact={false} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>

    )
}