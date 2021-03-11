import React, { useEffect } from 'react'
import MainArea from './MainArea';

export default function UserDashboardView() {

    const handleClickDotButton = (e) => {
        console.log(e);
        var menu = document.querySelector('.menu');
        menu.classList.toggle('opened');
    }


    return (
        <div className="userDashboard-container">
            <div className="header">
                <h1>My Logo</h1>

                <section className="menu">
                    <ul className="menu-list">
                        <li className="active">Trang chủ</li>
                        <li>Bảng xếp hạng</li>
                        <li>Đăng ký</li>
                        <li>Liên hệ</li>
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
