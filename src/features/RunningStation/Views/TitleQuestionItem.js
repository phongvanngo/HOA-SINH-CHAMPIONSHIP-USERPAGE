import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import { changeQuestion } from './../RunningStationSlice';
import Countdown from './Countdown';

export default function TitleQuestionItem({ detailedQuestion }) {
    const dispatch = useDispatch();
    const { index, id, time } = detailedQuestion;

    const [myState, setMyState] = useState({ isActive: 'false' });

    const currentQuestion = useSelector(state => state.runningStation.currentQuestion?.id === id ? state.runningStation.currentQuestion : null);

    let isActive;

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
        dispatch(changeQuestion(detailedQuestion));
    }

    return (
        <div className={`title-question-item ${myState.isActive ? 'active' : ''}`} onClick={() => { handleClickQuestion() }}>
            <p><span>Câu </span>&nbsp;{index + 1}</p>
            <p> <i className="fas fa-stopwatch" />&nbsp;{
                <Countdown questionId={id} timeRemaining={time} active={myState.isActive} />
            }</p>
        </div >
    )
}
