import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { questionTimeOut, setTimeRemaining } from '../RunningStationSlice';

export default function Countdown({ timeRemaining, active, questionId }) {
    const [time, setTime] = useState(timeRemaining);
    const [run, setRun] = useState(false);
    const dispatch = useDispatch();
    const formatTime = new Date(time).toISOString().substr(14, 5);
    let timer;

    useEffect(() => {
        if (run === false) return;
        if (time <= 0) {
            dispatch(questionTimeOut({ id: questionId }));
            return;
        } else {
            timer = setTimeout(() => {
                setTime(time - 1000);
            }, 1000);
        }
        return () => {
            dispatch(setTimeRemaining({ questionId: questionId, timeRemaining: time }));
            clearTimeout(timer);
        }
    }, [time, dispatch, run]);

    useEffect(() => {
        if (active === true) {
            if (time > 0)
                setTime(time - 1000);
            setRun(true);
        }
        else {
            setRun(false);
        }
    }, [active]);

    return (
        <span>{formatTime}</span>
    )
}
