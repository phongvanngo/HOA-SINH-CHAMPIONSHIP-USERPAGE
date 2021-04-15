import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ExamRules from '../../../../User/ExamRules/ExamRules';
import { enterExamRoomAgain, fetchRunningStationRequest, checkRunningStationStatus } from './../../../../../features/RunningStation/RunningStationSlice';
import { logout } from './../../../../../features/userLogin/userLoginSlice';
import { LandingPageRoutes, PublicRoutes } from './../../../../../routes.const';
import './Userpage.scss';
import { ConstUserExamStatus } from './../../../../../app/const.app';


export default function Userpage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userLogin.user);
    const examStatus = useSelector(state => state.runningStation.examStatus);

    const { userExamStatus, sessionStatus } = examStatus;

    let { fullName, sessionName } = user;

    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("signin");

        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";

        //check user exam status - kiểm tra user đã làm, đang làm 
        dispatch(checkRunningStationStatus({}));
    }, [dispatch])

    const handleLogut = () => {
        dispatch(logout());
    }

    const handleGoToExam = () => {
        if (userExamStatus === ConstUserExamStatus.READY) {
            dispatch(fetchRunningStationRequest()).then(() => {
                history.push(PublicRoutes.TEST);
            });
        } else
            if (userExamStatus === ConstUserExamStatus.DOING) {
                dispatch(enterExamRoomAgain()).then(() => {
                    history.push(PublicRoutes.TEST);
                });
            };

    }

    const ExamStatusComponent = () => {
        switch (userExamStatus) {
            case ConstUserExamStatus.OVERTIME:
                return (
                    <div style={{ margin: "auto" }}>
                        <p style={{ color: 'green' }}>Bạn đã hoàn thành bài thi, hãy đón chờ xem kết quả trên bảng xếp hạng nhé !</p>
                    </div>
                )
            case ConstUserExamStatus.DOING:
                return (
                    <div style={{ margin: "auto" }}>
                        <p style={{ color: '#FFCC00' }}>Bạn chưa hoàn thành bài thi</p>
                        <Button
                            // onClick={handleGoToLeaderboard}
                            variant="primary"
                            style={{ marginRight: '5px' }}>
                            Tiếp tục làm bài
                                    </Button>
                    </div>
                )
            case ConstUserExamStatus.READY:
                return (
                    <div style={{ margin: "auto" }}>
                        <p style={{ color: 'green' }}>Ca thi của bạn đã sẵn sàng, chọn bắt đầu để làm bài ngay nào !</p>
                        <Button
                            onClick={() => { handleGoToExam() }}
                            variant="primary"
                            style={{ marginRight: '5px' }}>
                            Bắt đầu
                                    </Button>
                    </div>
                )
            case ConstUserExamStatus.NOT_READY:
                return (
                    <div style={{ margin: "auto" }}>
                        <p style={{ color: 'red' }}>Ca thi của bạn hiện tại chưa bắt đầu !</p>
                        <Button
                            onClick={() => { handleGoToExam() }}
                            variant="primary"
                            style={{ marginRight: '5px' }}>
                            Bắt đầu
                                    </Button>
                    </div>
                )

            default:
                return <div></div>
                break;
        }
    }

    return (
        <div className="userpage-container">
            <div style={{ height: '30px' }}></div>
            <div className="card-container" style={{ marginBottom: '50px' }}>
                <div className="card-body">
                    <h2 className="greeting">{`Xin chào ${fullName}`}</h2>
                    <p>Ca thi của bạn: {sessionName}</p>
                    <div>

                        <ExamStatusComponent />
                        <Button
                            onClick={() => { handleLogut() }}
                            variant="secondary"
                            style={{ marginRight: '5px' }}>
                            Thoát
                                    </Button>
                    </div>
                </div>
            </div>
            <ExamRules />
        </div>
    )
}