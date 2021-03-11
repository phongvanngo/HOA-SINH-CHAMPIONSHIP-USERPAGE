import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import MainArea from './MainArea';
import { UserDashboardRoutes } from '../../../../routes.const';
export default function LandingpageView() {

    const { HOMEPAGE, LEADERBOARD, CONTACT, USER_LOGIN } = UserDashboardRoutes;

    const handleClickDotButton = (e) => {
        var menu = document.querySelector('.menu');
        menu.classList.toggle('opened');
    }

    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");

        // Loop through the buttons and add the active class to the current/clicked button
        for (var i = 0; i < menuList.length; i++) {
            menuList[i].addEventListener("click", function () {
                var menu = document.querySelector('.opened');
                if (menu !== null) menu.classList.toggle('opened');
            });
        }

    })


    return (
        <div className="userDashboard-container">
            <div className="header">
                <h1>My Logo</h1>

                <section className="menu">
                    <ul className="menu-list" id="MenuUserPage">
                        <li>
                            <Link to={HOMEPAGE} className="menu-item homepage">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to={LEADERBOARD} className="menu-item leaderboard">Bảng xếp hạng</Link>
                        </li>
                        <li>
                            <Link to={USER_LOGIN} className="menu-item signin">Tham gia thi</Link>
                        </li>
                        <li>
                            <Link to={CONTACT} className="menu-item contact">Liên hệ</Link>
                        </li>
                    </ul>

                    <button onClick={handleClickDotButton}>
                        <i className="fas fa-times"></i>
                        <i className="fas fa-bars"></i>
                    </button>
                </section>
            </div>
            <MainArea />

        </div>
    )
}
