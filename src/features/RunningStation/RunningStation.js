import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { LandingPageRoutes } from '../../routes.const';
import MainContainer from './Views/MainContainer';
import ImageDialog from './Views/ImageDialog';
import TimeOutDialog from './Views/TimeOutDialog';



export default function RunningStation() {
    const listQuestions = useSelector(state => state.runningStation.listQuestions)


    useEffect(() => {
        // if (detailedRunningStation === null) setIsHaveExam(false);
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
