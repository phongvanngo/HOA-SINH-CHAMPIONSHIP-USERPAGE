import React from 'react'
import './UserLogin.scss'

export default function UserLogin() {
    return (
        <div className="user-login-container">
            <div className="input-area">
                <div class="form-group form-container">
                    <label for="exampleInputEmail1">Mã dự thi của bạn</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                    <small id="emailHelp" class="form-text text-muted">Bạn cần nhập chính xác mã dự thi được cung cấp</small>
                </div>
                <button class="btn btn-primary">Đăng nhập</button>
            </div>
        </div>
    )
}
