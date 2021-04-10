import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { runningStationApi } from './RunningStationApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';
import { deactiveUser } from '../userLogin/userLoginSlice';

import { fakeListQuestions } from './fakedata';



export const fetchRunningStationRequest = createAsyncThunk(
    'runningStation/fetchRunningStationStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await runningStationApi.getRunningStation();

            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return response.data;
                case 401:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unsuccessfully");
            }
        }
        catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    }
);
export const fetchRunningStationRequestAgain = createAsyncThunk(
    'runningStation/fetchRunningStationStatusAgain',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await runningStationApi.getRunningStation();

            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return response.data;
                case 401:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unsuccessfully");
            }
        }
        catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    }
);
export const checkRunningStationStatus = createAsyncThunk(
    'runningStation/checkRunningStationStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await runningStationApi.getRunningStationStatus();

            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    // dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return response.data;
                case 401:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unsuccessfully");
            }
        }
        catch (error) {
            // dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    }
);



export const submitUserAnswers = createAsyncThunk(
    'runningStation/createRunningStationStatus',
    async (params, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        try {
            dispatch(startLoading());
            const userAnswers = getState().runningStation.userAnswers;
            //transfer schema
            const response = await runningStationApi.putUserAnswer(userAnswers);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Nộp bài thi thành công", options: { variant: 'success', autoHideDuration: 3000, } }));
                    dispatch(deactiveUser());
                    dispatch(stopLoading());
                    return 1;
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const runningStationSlice = createSlice({
    name: 'runningStation',
    initialState: {
        // listQuestions:null,
        // listAnswers:null,
        // timeStart:null,
        // timeToDo: null,
        // detailedRunningStation: fakeDetailedExam,
        // listQuestions: fakeListQuestions,

        detailedRunningStation: {},
        listQuestions: fakeListQuestions,
        userAnswers: null,
        time: null,
        timeStart: null,
        openingImage: null,
        isTimeOutDialogOpen: false,
        runningStationStatus: null,
        timeToDo: null,

    },

    reducers: {
        choseAnswer: (state, action) => {
            const { id, ans } = action.payload;
            const newListAnswers = state.userAnswers.map((element) => {
                if (element.id === id) return { id: id, ans: ans }; else return element;
            })

            state.userAnswers = newListAnswers;
        },

        openImageDialog: (state, action) => {
            state.openingImage = action.payload;
        },

        closeImageDialog: (state) => {
            state.openingImage = null;
        },

        timeOut: (state) => {
            state.isTimeOutDialogOpen = true;
        },

        closeTimeOutDialog: (state) => {
            state.isTimeOutDialogOpen = false;
        }

    },

    extraReducers: {
        [fetchRunningStationRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions.map((element) => { return { id: element.id, ans: null } });

            state.detailedRunningStation = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.time = time * 60;
            state.timeToDo = time;
            state.userAnswers = listAnswers;
        },

        [fetchRunningStationRequestAgain.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions ? questions.map((element) => { return { id: element.id, ans: null } }) : [];

            let usedTime = Date.now() - Date.parse(timeServerStart);
            let timeRemaining = time * 60 * 1000 - usedTime;



            state.detailedRunningStation = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.timeToDo = time;
            state.time = isNaN(timeRemaining) ? 0 : Math.floor(timeRemaining / 1000);
            state.userAnswers = listAnswers;
        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            if (action.payload === null) return;
            state.detailedRunningStation = null;
        },
        [checkRunningStationStatus.fulfilled]: (state, action) => {
            const { message } = action.payload;

            switch (message) {
                case "User had submited this exam":
                    state.runningStationStatus = 2;
                    break;

                case "You are doing exam":
                    state.runningStationStatus = 1;
                    break

                case "you already to start exam":
                    state.runningStationStatus = 0;
                    break;


                case "This exam is current not available":
                    state.runningStationStatus = 3;
                    break;

                case "It's over time":
                    state.runningStationStatus = 2;
                    break;

                default:
                    break;
            }


        },

    }
})

export const { closeTimeOutDialog, timeOut, openImageDialog, closeImageDialog, choseAnswer } = runningStationSlice.actions;

export default runningStationSlice.reducer;