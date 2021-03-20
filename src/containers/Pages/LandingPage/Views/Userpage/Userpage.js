import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserExamRequest, fetchUserExamRequestAgain, checkUserExamStatus } from './../../../../../features/userExam/UserExamSlice';
import { logout } from './../../../../../features/userLogin/userLoginSlice';
import { LandingPageRoutes, PublicRoutes } from './../../../../../routes.const';
import './Userpage.scss';


export default function Userpage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userLogin.user);
    const userExamStatus = useSelector(state => state.userExam.userExamStatus);

    let { fullName, sessionName } = user;

    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("signin");

        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";

        //check user exam status - kiểm tra user đã làm, đang làm hay đang thi
        dispatch(checkUserExamStatus({}));
    }, [dispatch])

    const handleLogut = () => {
        dispatch(logout());
    }

    const handleGoToLeaderboard = () => {
        history.push(LandingPageRoutes.LEADERBOARD);
    }

    const handleGoToExam = () => {
        if (userExamStatus === 0) {
            dispatch(fetchUserExamRequest()).then(() => {
                history.push(PublicRoutes.TEST);
            });
        }
        else {
            //continue test
            dispatch(fetchUserExamRequestAgain()).then(() => {
                history.push(PublicRoutes.TEST);
            });
        }

    }

    return (
        <div className="userpage-container">
            <div style={{ height: '30px' }}></div>
            <div className="card-container">
                <div className="card-body">
                    <h2 className="greeting">{`Xin chào ${fullName}`}</h2>
                    <p>Ca thi của bạn: {sessionName}</p>
                    {userExamStatus === 2 ? <p style={{ color: 'red' }}>Bạn đã hoàn thành bài thi, hãy theo dõi bảng xếp hạng sau khi kết thúc ca thi để biết được kết quả nhé !</p> : ''}
                    {userExamStatus === 3 ? <p style={{ color: 'red' }}>Ca thi của bạn hiện tại chưa bắt đầu</p> : ''}
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: 'auto', justifyContent: 'center' }}>
                        {
                            (userExamStatus === 0 || userExamStatus === 1) ?
                                (
                                    <Button
                                        onClick={handleGoToExam}
                                        variant="primary"
                                        style={{ marginRight: '5px' }}>
                                        {
                                            userExamStatus === 0 ?
                                                'Bắt đầu làm bài' :
                                                'Tiếp tục làm bài'
                                        }
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
