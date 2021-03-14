import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserExamRequest } from './../../../../../features/userExam/UserExamSlice';
import { logout } from './../../../../../features/userLogin/userLoginSlice';
import { LandingPageRoutes, PublicRoutes } from './../../../../../routes.const';
import './Userpage.scss';


export default function Userpage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userLogin.user);
    let { code, fullName, sessionName, isActive } = user;

    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("signin");

        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";
    }, [])

    const handleLogut = () => {
        dispatch(logout());
    }

    const handleGoToLeaderboard = () => {
        history.push(LandingPageRoutes.LEADERBOARD);
    }

    const handleGoToExam = () => {
        dispatch(fetchUserExamRequest()).then(() => {
            history.push(PublicRoutes.TEST);
        });

    }

    return (
        <div className="userpage-container">
            <div className="card-container">
                <div className="card-body">
                    <h2 className="greeting">{`Xin chào ${fullName}`}</h2>
                    <p>Ca thi của bạn: {sessionName}</p>
                    {isActive === false ? <p style={{ color: 'red' }}>Bạn đã hoàn thành bài thi, hãy theo dõi bảng xếp hạng để biết được kết quả nhé</p> : ''}
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: 'auto' }}>
                        {
                            isActive ?
                                (
                                    <Button
                                        onClick={handleGoToExam}
                                        variant="primary"
                                        style={{ marginRight: '5px' }}>
                                        Bắt đầu làm bài
                                    </Button>
                                )
                                :
                                (
                                    <Button
                                        onClick={handleGoToLeaderboard}
                                        variant="primary"
                                        style={{ marginRight: '5px' }}>
                                        Bảng xếp hạng
                                    </Button>
                                )

                        }
                        <Button variant="secondary" onClick={handleLogut}>Thoát</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
