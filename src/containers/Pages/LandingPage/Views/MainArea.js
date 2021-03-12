import React, { lazy } from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { LandingPageRoutes } from './../../../../routes.const';


const Homepage = lazy(() => import('./Homepage/Homepage'));
const Leaderboard = lazy(() => import('./Leaderboard/Leaderboard'));
const UserSignIn = lazy(() => import('./UserSignIn/UserSignIn'));
const ContactPage = lazy(() => import('./Contact/Contact'));
const Userpage = lazy(() => import('./Userpage/Userpage'));

const { HOMEPAGE, LEADERBOARD, USER_LOGIN, CONTACT, USER, LANDINGPAGE } = LandingPageRoutes;
function PrivateRouteUser({ children, ...rest }) {
    let location = useLocation();
    const hasLoggedIn = useSelector(state => state.userLogin.hasLoggedIn);
    if (hasLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: USER_LOGIN,
                state: { from: location },
            }}
        />
    )
}

export default function MainArea() {
    return (
        <div>
            <Switch>
                <Route path={HOMEPAGE} component={Homepage} />
                <Route path={LEADERBOARD} component={Leaderboard} />
                <Route path={USER_LOGIN} component={UserSignIn} />
                <Route path={CONTACT} component={ContactPage} />
                <PrivateRouteUser path={USER}>
                    <Userpage />
                </PrivateRouteUser>
                <Route exact path={LANDINGPAGE} component={Homepage} />
            </Switch>
        </div>
    )
}
