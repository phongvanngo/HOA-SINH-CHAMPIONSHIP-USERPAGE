import React from 'react';
export default function LandingpageView({ handleLogout }) {

    const handleClickDotButton = (e) => {
        var menu = document.querySelector('.menu');
        menu.classList.toggle('opened');
    }

    return (
        <div className="userDashboard-container">
            <div className="header">
                <h1>My Logo</h1>

                <section className="menu">
                    <ul className="menu-list" id="MenuUserPage">
                        <li onClick={handleLogout}>
                            {/* <Link to={HOMEPAGE} className="menu-item homepage">Đăng xuất</Link> */}
                            Đăng xuất
                        </li>
                    </ul>

                    <button onClick={handleClickDotButton}>
                        <i className="fas fa-times"></i>
                        <i className="fas fa-bars"></i>
                    </button>
                </section>
            </div>

        </div>
    )
}
