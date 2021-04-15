import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { runningStationApi } from './RunningStationApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';
import { deactiveUser } from '../userLogin/userLoginSlice';

import { fakeListQuestions } from './fakedata';
import { ConstUserExamStatus } from "../../app/const.app";

const findNextValidQuestion = (listQuestions, currentQuestionIndex) => {
    console.log(listQuestions);
    let count = 0;
    let index = currentQuestionIndex;
    while (count < listQuestions.length - 1) {
        count++;
        console.log(count, listQuestions.length)
        index++;
        if (index >= listQuestions.length) index = 0;
        console.log(listQuestions[index]);
        if (listQuestions[index].time !== 0) return index;
    };

    return null;
}


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

        time: null,
        timeStart: null,
        openingImage: null,
        isTimeOutDialogOpen: false,
        runningStationStatus: null,
        timeToDo: null,

        //running station
        examStatus: {},
        userAnswers: [],
        listQuestions: null,
        timeRemaining: [],
        currentQuestion: null,

    },

    reducers: {

        openImageDialog: (state, action) => {
            state.openingImage = action.payload;
        },

        closeImageDialog: (state) => {
            state.openingImage = null;
        },



        closeTimeOutDialog: (state) => {
            state.isTimeOutDialogOpen = false;
        },
        //use
        changeQuestion: (state, action) => {
            const question = action.payload;
            if (question?.id === state.currentQuestion.id) return;
            state.currentQuestion = { ...question };
            console.log(action.payload);
        },
        questionTimeOut: (state, action) => {

            const { id } = action.payload;
            let newTimeRemaining = [...state.timeRemaining];

            let index = 0;

            for (let i = 0; i < newTimeRemaining.length; i++) {
                if (newTimeRemaining[i].id === id) {
                    newTimeRemaining[i].time = 0;
                    index = i;
                    break;
                }
            }

            state.timeRemaining = newTimeRemaining;
            //find next question
            let nextQuestionIndex = findNextValidQuestion(newTimeRemaining, index);
            if (nextQuestionIndex === null) {
                state.isTimeOutDialogOpen = true;
                // return;
            }
            state.currentQuestion = { ...state.listQuestions[nextQuestionIndex], index: nextQuestionIndex };
            console.log(id, 'time out');
        },
        enterExamRoomAgain: (state) => {

        },
        choseAnswer: (state, action) => {
            const { id, ans } = action.payload;
            const newListAnswers = state.userAnswers.map((element) => {
                if (element.id === id) return { id: id, ans: ans }; else return element;
            })

            state.userAnswers = newListAnswers;
        },
    },

    extraReducers: {
        [fetchRunningStationRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questions, timeServerStart, time, } = response_data;

            let newUserAnswers = [];
            let timeRemaining = [];

            questions.forEach(question => {
                newUserAnswers.push({ id: question.id, ans: null });
                timeRemaining.push({ id: question.id, time: question.time / 1000 });
            });

            state.userAnswers = newUserAnswers;
            state.timeRemaining = timeRemaining;
            state.listQuestions = questions;
            state.currentQuestion = { ...questions[0], index: 0 };

        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            if (action.payload === null) return;
            state.detailedRunningStation = null;
        },
        [checkRunningStationStatus.fulfilled]: (state, action) => {
            const { code } = action.payload;
            const { NOT_READY, READY, OVERTIME, SUBMITTED, DOING } = ConstUserExamStatus;
            let userStatus;
            switch (code) {
                case 1:
                    //chưa thi và exam chưa kích hoạt
                    userStatus = NOT_READY
                    break;
                case 2:
                    //chưa thi và exam đã kích hoạt
                    userStatus = READY
                    break;
                case 3:
                    //đang làm bài
                    userStatus = DOING
                    break;
                case 4:
                    //hết giờ
                    userStatus = OVERTIME
                    break;

                default:
                    break;
            }
            console.log(action.payload);

            state.examStatus = { userExamStatus: userStatus };
        },

    }
})

export const { enterExamRoomAgain, changeQuestion, closeTimeOutDialog, questionTimeOut, openImageDialog, closeImageDialog, choseAnswer } = runningStationSlice.actions;

export default runningStationSlice.reducer;