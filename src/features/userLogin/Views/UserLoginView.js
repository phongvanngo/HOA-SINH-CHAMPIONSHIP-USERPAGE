import React, { useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './UserLoginView.scss';
export default function UserLoginView({ handleLogin }) {

    const codeInputRef = useRef(null);


    const handleSubmit = () => {
        const loginInfo = { code: codeInputRef.current.value };
        handleLogin(loginInfo);
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        codeInputRef.current.value = user ? user.code : '';
    }, [])



    return (
        <div className="user-login-container">
            <div className="input-area">
                <Form.Label>Mã dự thi của bạn</Form.Label>
                <Form.Control ref={codeInputRef} type="email" placeholder='Enter code here
                ' />
                <Form.Text className="text-muted">
                    Bạn cần nhập chính xác mã dự thi được cung cấp
    </Form.Text>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Đăng nhập
  </Button>

            </div>
        </div>
    )
}
