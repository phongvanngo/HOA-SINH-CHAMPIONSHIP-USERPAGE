import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { timeOut } from '../RunningStationSlice';

export default function Countdown({ timeRemaining }) {
    const [time, setTime] = useState(timeRemaining);
    const dispatch = useDispatch();
    const formatTime = new Date(time * 1000).toISOString().substr(14, 5);

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else {
            dispatch(timeOut());
        }
    }, [time, dispatch]);

    return (
        <span>{formatTime}</span>
    )
}
