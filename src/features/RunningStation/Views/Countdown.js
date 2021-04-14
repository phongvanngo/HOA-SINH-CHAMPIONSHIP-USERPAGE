import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { questionTimeOut } from '../RunningStationSlice';

export default function Countdown({ timeRemaining, active, questionId }) {
    const [time, setTime] = useState(timeRemaining);
    const [run, setRun] = useState(false);
    const dispatch = useDispatch();
    const formatTime = new Date(time * 1000).toISOString().substr(14, 5);
    let timer;

    useEffect(() => {
        if (run === false) return;
        if (time <= 0) {
            dispatch(questionTimeOut({ id: questionId }));
            return;
        } else {
            timer = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [time, dispatch, run]);

    useEffect(() => {
        if (active === true) {
            if (time > 0)
                setTime(time - 1);
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
