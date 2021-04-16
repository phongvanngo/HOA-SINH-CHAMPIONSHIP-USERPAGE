import React, { useEffect } from 'react'
import QuestionList from './QuestionList';
import HeaderBar from './HeaderBar';
import './MainContainer.scss';
import Button from '@material-ui/core/Button';
import { submitUserAnswers } from '../RunningStationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from './Countdown';
import ListTitleQuestion from './ListTitleQuestion';
import QuestionItem from './QuestionItem';


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
                <div className="right-area">
                    <div className="title-area">
                        <div className="title">
                            <p>Bài thi vòng 2</p>
                            <p>HÓA SINH CHAMPIONSHIP</p>
                        </div>
                        <div className="question-divider">
                            <div className="divider-text">Danh sách câu hỏi </div>
                        </div>
                    </div>
                    <div className="list-title-question-area">
                        <ListTitleQuestion />
                    </div>
                </div>
                <div className="time-container">
                    <div id="timeArea">
                        {/* <p>Thời gian còn lại: <Countdown timeRemaining={time} /></p> */}
                    </div>
                </div>

                <div className="main-content">
                    <div className="question-area">
                        {/* <QuestionList /> */}
                        <QuestionItem />
                    </div>
                    <div className="footer-exam">
                        <Button
                            onClick={() => {
                                if (window.confirm('Bạn có chắc chắn nộp và kết thúc bài làm ?')) {
                                    dispatch(submitUserAnswers({}).then(()=>{
                                        
                                    }))
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
