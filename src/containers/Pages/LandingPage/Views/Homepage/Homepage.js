import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { LandingPageRoutes } from './../../../../../routes.const';
import MainImage from './images/img.svg';
import LOGO_HSC_White from './../../../../../Assets/logo-HSC-White.svg';
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
                <div className="title">
                    <p> VÒNG SƠ LOẠI</p>
                    <p> HÓA SINH CHAMPIONSHIP</p>
                </div>

                <p className="msg">
                    Hóa Sinh Championship Mùa 3 là một cuộc thi về bộ môn Hóa sinh dành cho sinh viên khối ngành chăm sóc sức khỏe do Đại học Y Dược TP.HCM tổ chức nhằm tạo ra sân chơi bổ ích và thú vị để tăng kiến thức, kĩ năng và tạo cơ hội giao lưu gặp gỡ giữa các sinh viên có cùng đam mê.
                </p>
                <button onClick={handleGoToExam} className="cta">THI NGAY</button>
            </section>

            <section className="right">
                <img src={LOGO_HSC_White} alt="landingpage" />
            </section>

        </section>
    )
}
