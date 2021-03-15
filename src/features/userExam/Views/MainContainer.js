import React, { useEffect } from 'react'
import QuestionList from './QuestionList';
import HeaderBar from './HeaderBar';
import './MainContainer.scss';
import Button from '@material-ui/core/Button';
import { submitUserAnswers } from './../UserExamSlice';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from './Countdown';

export default function MainContainer() {
    const dispatch = useDispatch();

    const time = useSelector(state => state.userExam.time);

    useEffect(() => {
        window.onscroll = function () { myFunction() };

        var navbar = document.getElementById("timeArea");
        var sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }, [])
    return (
        <div className="user-exam-container">
            <HeaderBar />
            <div style={{ height: '20vh' }}></div>
            <div className="MainArea">
                <div className="greeting-area">
                    <h2>Bài thi HÓA SINH CHAMPIONISHIP 2021</h2>
                    <p>Thời gian làm bài: 10 phút</p>
                </div>
                <div className="time-container">
                    <div id="timeArea">
                        <p>Thời gian còn lại: <Countdown timeRemaining={time} /></p>
                    </div>
                </div>

                <div className="main-content">
                    <div className="question-area">
                        <QuestionList />
                    </div>
                    <div className="footer-exam">
                        <Button
                            onClick={() => { dispatch(submitUserAnswers({})) }}
                            variant="contained" color="secondary">
                            Nộp bài
</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
