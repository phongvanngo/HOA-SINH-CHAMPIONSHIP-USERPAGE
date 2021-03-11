import React from 'react';

import './AppHeader.css';

export default function AppHeader() {
    return (
        <div className="homepage-header">
        <h1>My Logo</h1>

        <section class="menu">
            <ul class="menu-list">
                <li class="active">Trang chủ</li>
                <li>Bảng xếp hạng</li>
                <li>Đăng ký</li>
                <li>Liên hệ</li>
            </ul>

            <button>
                <i class="fas fa-times"></i>
                <i class="fas fa-bars"></i>
            </button>
        </section>
    </div >
    )
}
