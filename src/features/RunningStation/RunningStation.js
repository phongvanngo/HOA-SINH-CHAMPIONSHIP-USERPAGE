import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { LandingPageRoutes } from '../../routes.const';
import MainContainer from './Views/MainContainer';
import ImageDialog from './Views/ImageDialog';
import TimeOutDialog from './Views/TimeOutDialog';

import { runningStationApi } from './RunningStationApi';



export default function RunningStation() {
    const listQuestions = useSelector(state => state.runningStation.listQuestions)


    useEffect(() => {
        const autoBackupAnswer = setInterval(() => {
            try {
                console.log("backup");
                let userAnswser = JSON.parse(localStorage.getItem('userAnswers'));
                if (userAnswser) {
                    runningStationApi.putUserAnswer(userAnswser);
                }

            } catch (error) {
                console.log(error);
            }
        }, 30000);
        return () => clearInterval(autoBackupAnswer);
    }, [])

    if (!listQuestions) return <Redirect to={LandingPageRoutes.USER} />

    return (
        <div>
            <TimeOutDialog />
            <ImageDialog />
            <MainContainer />
        </div>
    )
}
