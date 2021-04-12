import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import { changeQuestion } from './../RunningStationSlice';

export default function TitleQuestionItem({ detailedQuestion }) {
    const dispatch = useDispatch();
    const currentQuestion = useSelector(state => state.runningStation.currentQuestion);
    const activeId = currentQuestion.id;
    const { index, id } = detailedQuestion;
    let timeRemaining = currentQuestion.timeRemaining;

    const handleClickQuestion = () => {
        dispatch(changeQuestion(detailedQuestion));
    }
    return (
        <div className={`title-question-item ${activeId === id ? 'active' : ''}`} onClick={() => { handleClickQuestion() }}>
            <p><span>Câu </span>&nbsp;{index}</p>
            <p> <i className="fas fa-stopwatch"></i> {timeRemaining}</p>
        </div >
    )
}
