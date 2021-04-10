import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { LandingPageRoutes } from '../../routes.const';
import MainContainer from './Views/MainContainer';
import ImageDialog from './Views/ImageDialog';
import TimeOutDialog from './Views/TimeOutDialog';



export default function RunningStation() {
    const detailedRunningStation = useSelector(state => state.runningStation.detailedRunningStation)


    useEffect(() => {
        // if (detailedRunningStation === null) setIsHaveExam(false);
    }, [])

    if (detailedRunningStation === null) return <Redirect to={LandingPageRoutes.USER} />

    return (
        <div>
            <TimeOutDialog />
            <ImageDialog />
            <MainContainer />
        </div>
    )
}
