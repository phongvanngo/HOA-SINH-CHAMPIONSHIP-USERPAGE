import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import { changeQuestion } from './../RunningStationSlice';
import Countdown from './Countdown';

export default function TitleQuestionItem({ detailedQuestion }) {
    const dispatch = useDispatch();
    const { index, id, time } = detailedQuestion;

    const [myState, setMyState] = useState({ isActive: 'false' });
    const [hasTime, setHasTime] = useState(time > 0 ? true : false);

    const currentQuestion = useSelector(state => state.runningStation.currentQuestion?.id === id ? state.runningStation.currentQuestion : null);

    let isActive;

    const handleTimeOut = () => {
        setHasTime(false);
    }

    useEffect(() => {
        if (currentQuestion !== null) {
            isActive = true;
            setMyState({
                isActive: true,
            })
        } else {
            setMyState({
                isActive: false,
            })
        }
    }, [currentQuestion])

    const handleClickQuestion = () => {
        if (hasTime) {
            dispatch(changeQuestion(detailedQuestion));
        }
    }

    return (
        <div className={`title-question-item ${hasTime ? myState.isActive ? 'active' : '' : 'time-out'}`} onClick={() => { handleClickQuestion() }}>
            <p><span>Câu </span>&nbsp;{index + 1}</p>
            <p> <i className="fas fa-stopwatch" />&nbsp;{
                <Countdown handleTimeOut={handleTimeOut} questionId={id} timeRemaining={time} active={myState.isActive} />
            }</p>
        </div >
    )
}
