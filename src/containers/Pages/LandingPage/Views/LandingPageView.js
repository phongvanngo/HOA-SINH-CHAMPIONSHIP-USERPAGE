import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LandingPageRoutes } from '../../../../routes.const';
import MainArea from './MainArea';
import LOGO_DHYD from './../../../../Assets/logo_DHYD.jpg';
import LOGO_HSV from './../../../../Assets/logo_HSV.jpg';
export default function LandingpageView({ handleEnterUserPage }) {

    const { HOMEPAGE, LEADERBOARD, CONTACT, USER } = LandingPageRoutes;

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
            <div className="landingpage-header">
                <div className="logo-area">
                    <img src={LOGO_DHYD} alt="log-dhyd" />
                    {/* <img src={LOGO_HSV} alt="log-dhyd" /> */}

                </div>

                <section className="menu">
                    <ul className="menu-list" id="MenuUserPage">
                        <li>
                            <Link to={HOMEPAGE} className="menu-item homepage">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to={LEADERBOARD} className="menu-item leaderboard">Bảng xếp hạng</Link>
                        </li>
                        <li>
                            <Link to={CONTACT} className="menu-item contact">Liên hệ</Link>
                        </li>
                        <li>
                            <Link to={USER} className="menu-item signin">Cá nhân</Link>
                        </li>
                    </ul>

                    <button onClick={handleClickDotButton}>
                        <i className="fas fa-times"></i>
                        <i className="fas fa-bars"></i>
                    </button>
                </section>
            </div>
            <div className="landingpage-content">
                <MainArea />
            </div>

        </div>
    )
}
