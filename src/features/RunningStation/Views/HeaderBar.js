import React from 'react'
import './HeaderBar.scss';
import LOGO_HSC_Black from './../../../Assets/logo-HSC-Black-v2.svg';

export default function HeaderBar() {
    return (
        <div className="headerbar-container">
            <div className="logo-area">
                <img src={LOGO_HSC_Black} alt="log-dhyd" />
                {/* <img src={LOGO_HSV} alt="log-dhyd" /> */}
            </div>
            <div className="contest-name">
                <span>HOA SINH CHAMPIONSHIP 2021</span>
            </div>
        </div>
    )
}
