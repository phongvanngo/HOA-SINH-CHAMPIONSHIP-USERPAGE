import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeQuestion } from './../RunningStationSlice';

export default function TitleQuestionItem({ detailedQuestion }) {
    const { index, id } = detailedQuestion;
    const dispatch = useDispatch();
    const currentQuestionId = useSelector(state => state.runningStation.currentQuestionId)
    const handleClickQuestion = () => {
        dispatch(changeQuestion(detailedQuestion));
    }
    return (
        <div className={`title-question-item ${currentQuestionId === id ? 'active' : ''}`} onClick={() => { handleClickQuestion() }}>
            <p><span>Câu </span>&nbsp;{index}</p>
            <p>12:34</p>
        </div >
    )
}
