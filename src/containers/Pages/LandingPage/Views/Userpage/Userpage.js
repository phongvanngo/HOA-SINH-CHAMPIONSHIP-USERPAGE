import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Userpage.scss';
import { logout } from './../../../../../features/userLogin/userLoginSlice';

export default function Userpage() {
    const dispatch = useDispatch();
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

    }

    const handleGoToExam = () => {

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
                                        variant="primary"
                                        style={{ marginRight: '5px' }}>
                                        Bắt đầu làm bài
                                    </Button>
                                )
                                :
                                (
                                    <Button
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
