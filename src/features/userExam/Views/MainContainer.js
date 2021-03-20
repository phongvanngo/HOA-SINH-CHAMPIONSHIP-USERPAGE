import React, { useEffect } from 'react'
import QuestionList from './QuestionList';
import HeaderBar from './HeaderBar';
import './MainContainer.scss';
import Button from '@material-ui/core/Button';
import { submitUserAnswers } from './../UserExamSlice';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from './Countdown';
import Footer from '../../../containers/User/Footer';


export default function MainContainer() {
    const dispatch = useDispatch();

    const time = useSelector(state => state.userExam.time);

    const timeToDo = useSelector(state => state.userExam.timeToDo);


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
                    <p>Thời gian làm bài: <span>{`${timeToDo} phút`}</span></p>
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
                            onClick={() => {
                                if (window.confirm('Bạn có chắc chắn nộp và kết thúc bài làm ?')) {
                                    dispatch(submitUserAnswers({}))
                                }
                            }
                            }
                            variant="contained" color="secondary">
                            Nộp bài
</Button>
                    </div>
                </div>
            </div>
            <div className="user-exam-footer" style={{ height: '20px' }}></div>
        </div >
    )
}
