import React from 'react';

import './AppHeader.css';

export default function AppHeader() {
    return (
        <div className="homepage-header">
            <h1>My Logo</h1>

            <section className="menu">
                <ul className="menu-list">
                    <li className="active">Trang chủ</li>
                    <li>Bảng xếp hạng</li>
                    <li>Đăng ký</li>
                    <li>Liên hệ</li>
                </ul>

                <button>
                    <i className="fas fa-times"></i>
                    <i className="fas fa-bars"></i>
                </button>
            </section>
        </div >
    )
}
