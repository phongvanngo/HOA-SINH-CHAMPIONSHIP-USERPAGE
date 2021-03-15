import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { LandingPageRoutes } from './../../routes.const';
import MainContainer from './Views/MainContainer';
import ImageDialog from './Views/ImageDialog';
import TimeOutDialog from './Views/TimeOutDialog';



export default function UserExam() {
    const [isHaveExam, setIsHaveExam] = useState(true);
    const detailedUserExam = useSelector(state => state.userExam.detailedUserExam)

    console.log(detailedUserExam);

    useEffect(() => {
        // if (detailedUserExam === null) setIsHaveExam(false);
    }, [])

    if (detailedUserExam === null) return <Redirect to={LandingPageRoutes.USER} />

    return (
        <div>
            <TimeOutDialog />
            <ImageDialog />
            <MainContainer />
        </div>
    )
}
