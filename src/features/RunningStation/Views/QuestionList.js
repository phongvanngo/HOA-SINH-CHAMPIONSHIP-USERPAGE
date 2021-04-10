import React from 'react'
import { useSelector } from 'react-redux'
import QuestionItem from './QuestionItem';
import { shuffleArray } from '../../../app/utilities';


export default function QuestionList() {

    const listQuestions = useSelector(state => state.runningStation.listQuestions);

    return (
        <div>
            {listQuestions ? listQuestions.map((element, index) => {
                const { id, content, answerA, answerB, answerC, answerD, answerE, image } = element;
                let listAnswers = [{ ans: 'A', content: answerA }, { ans: 'B', content: answerB }];
                if (answerC !== null && answerC !== "") listAnswers = [...listAnswers, { ans: 'C', content: answerC }];
                if (answerD !== null && answerD !== "") listAnswers = [...listAnswers, { ans: 'D', content: answerD }];
                if (answerE !== null && answerE !== "" && answerE !== undefined) listAnswers = [...listAnswers, { ans: 'E', content: answerE }];
                listAnswers = shuffleArray(listAnswers);

                return (
                    <QuestionItem key={index} detailedQuestion={{ index: index + 1, listAnswers: listAnswers, content: content, image: image, questionId: id }} />
                )
            })
                : ''}
        </div>
    )
}
