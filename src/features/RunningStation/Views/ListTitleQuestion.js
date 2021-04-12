import React from 'react'

import { useSelector } from 'react-redux'

import './ListTitleQuestion.scss';
import TitleQuestionItem from './TitleQuestionItem';


export default function ListTitleQuestion() {
    const listQuestions = useSelector(state => state.runningStation.listQuestions);
    return (
        <div className="list-title-question">
            {listQuestions.map((question, index) => {
                return (
                    <TitleQuestionItem key={question.id} detailedQuestion={{ ...question, index: index + 1 }} />
                )
            })
            }
        </div>
    )
}
