import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { userLoginAgain, userLoginRequest } from './userLoginSlice';
import UserLoginView from './Views/UserLoginView';

export default function UserLogin() {

    const hasLoggedIn = useSelector(state => state.userLogin.hasLoggedIn);
    const dispatch = useDispatch();
    let location = useLocation();
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    //kiểm tra đã đăng nhập gần đây chưa, nếu rồi thì ko cần đăng nhập lại
    const idToken = localStorage.getItem('id_token');

    if (idToken != null) dispatch(userLoginAgain());

    React.useEffect(() => {
        if (hasLoggedIn) {
            setRedirectToReferrer(true);
        }

    }, [hasLoggedIn]);


    const handleLogin = (loginInfo) => {
        dispatch(userLoginRequest(loginInfo));
    }

    let { from } = location.state || {
        from: { pathname: '/' },
    };

    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }


    return (
        <div>
            <UserLoginView handleLogin={handleLogin} />
        </div>
    )
}
