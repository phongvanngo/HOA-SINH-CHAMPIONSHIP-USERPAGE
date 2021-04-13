import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import { changeQuestion } from './../RunningStationSlice';

export default function TitleQuestionItem({ detailedQuestion }) {
    const dispatch = useDispatch();
    const { index, id, time } = detailedQuestion;

    const [myState, setMyState] = useState({ timeRemaining: time, isActive: 'false' });

    const currentQuestion = useSelector(state => state.runningStation.currentQuestion?.id === id ? state.runningStation.currentQuestion : null);

    let isActive;

    useEffect(() => {
        if (currentQuestion !== null) {
            isActive = true;
            setMyState({
                timeRemaining: currentQuestion.timeRemaining,
                isActive: true,
            })
        } else {
            setMyState({
                ...myState,
                isActive: false,
            })
        }
    }, [currentQuestion])

    const handleClickQuestion = () => {
        dispatch(changeQuestion(detailedQuestion));
    }

    console.log('render', id, myState.timeRemaining);

    return (
        <div className={`title-question-item ${myState.isActive ? 'active' : ''}`} onClick={() => { handleClickQuestion() }}>
            <p><span>Câu </span>&nbsp;{index}</p>
            <p> <i className="fas fa-stopwatch" />&nbsp;{myState.timeRemaining}</p>
        </div >
    )
}
