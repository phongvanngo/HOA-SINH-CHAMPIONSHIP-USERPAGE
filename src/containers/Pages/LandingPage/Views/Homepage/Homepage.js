import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { LandingPageRoutes } from './../../../../../routes.const';
import MainImage from './images/img.svg';
// import './Homepage.scss';

export default function Homepage() {
    const history = useHistory();

    useEffect(() => {
        var menuContainer = document.getElementById("MenuUserPage");
        var menuList = menuContainer.getElementsByClassName("menu-item");
        var currentItem = menuContainer.getElementsByClassName("homepage");
        for (var i = 0; i < menuList.length; i++) {
            menuList[i].className = menuList[i].className.replace(" active", "");
        }
        currentItem[0].className += " active";
    }, [])

    const handleGoToExam = () => {
        history.push(LandingPageRoutes.USER);
    }


    return (
        <section className="main">

            <section className="left">
                <p className="title">HÓA SINH CHAMPIONSHIP</p>
                <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nihil rerum itaque quisquam!
                Natus repudiandae nesciunt tempora odio amet. Saepe?</p>
                <button onClick={handleGoToExam} className="cta">THI NGAY</button>
            </section>

            <section className="right">
                <img src={MainImage} alt="landingpage" />
            </section>

        </section>
    )
}
