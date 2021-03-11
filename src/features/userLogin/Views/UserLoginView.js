import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './UserLoginView.scss';
export default function UserLoginView({ handleLogin }) {
    return (
        <div className="user-login-container">
            <div className="input-area">
                <Form.Label>Mã dự thi của bạn</Form.Label>
                <Form.Control type="email" placeholder="Enter code" />
                <Form.Text className="text-muted">
                    Bạn cần nhập chính xác mã dự thi được cung cấp
    </Form.Text>
                <Button variant="primary" type="submit">
                    Đăng nhập
  </Button>

            </div>
        </div>
    )
}
