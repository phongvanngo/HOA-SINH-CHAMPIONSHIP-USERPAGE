import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContestSessionRequest } from './../../ContestSessionManagement/ContestSessionSlice';
import { fetchUniversityRequest } from './../../universityManagement/UniversitySlice';
import FilterArea from './FilterArea';
import './MainContainer.css';
import SearchArea from './SearchArea';
import UserCodeForm from './UserCodeForm';
import FastUserCodeForm from './FastUserCodeForm';
import UserList from './UserList';


export default function QuestionManagement() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContestSessionRequest({}));
        dispatch(fetchUniversityRequest({}));
    }, [dispatch])


    return (
        <React.Fragment>
            <div className="question-management-title">
                <Typography variant="h6" style={{ textAlign: "left" }}>
                    Quản lý thí sinh dự thi
</Typography>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <Grid item xs={12}>
                            <SearchArea />
                        </Grid>
                        <Grid item xs={12}>
                            <FilterArea />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <UserCodeForm />
                        </Grid> */}
                        <Grid item xs={12}>
                            <FastUserCodeForm />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <UserList />
                    </Grid>

                </Grid>
            </div>
        </React.Fragment>
    )
}
