import React, { useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ExamRules from './../../../containers/User/ExamRules/ExamRules';

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
            <div style={{ height: '30px' }}></div>
            <div className="main-container">
                <div className="input-area">
                    <Form.Label style={{ color: 'black' }}>Mã dự thi của bạn</Form.Label>
                    <Form.Control ref={codeInputRef} type="email" placeholder='Enter code here
                ' />
                    <Form.Text className="text-muted" >
                        <span style={{ color: 'black' }}>
                            Bạn cần nhập chính xác mã dự thi được cung cấp
                    </span>
                    </Form.Text>
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Đăng nhập
  </Button>
                </div>


            </div>
        </div>
    )
}
