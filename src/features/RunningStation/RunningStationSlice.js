import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { runningStationApi } from './RunningStationApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';
import { deactiveUser } from '../userLogin/userLoginSlice';

import { fakeListQuestions } from './fakedata';
import { ConstUserExamStatus } from "../../app/const.app";
import { LocationSearchingTwoTone } from "@material-ui/icons";

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
            let userAnswerIndex = state.userAnswers.findIndex(e => e.id === question.id);
            state.currentQuestion = { ...question, answer: state.userAnswers[userAnswerIndex].ans };
            localStorage.setItem("currentQuestionId", question.id);

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
                return;
            }

            let userAnswerId = state.listQuestions[nextQuestionIndex].id;
            let userAnswerIndex = state.userAnswers.findIndex(e => e.id === userAnswerId);

            state.currentQuestion = { ...state.listQuestions[nextQuestionIndex], index: nextQuestionIndex, answer: state.userAnswers[userAnswerIndex].ans };

            localStorage.setItem("currentQuestionId", state.listQuestions[nextQuestionIndex].id);

            console.log(id, 'time out');
        },
        enterExamRoomAgain: (state) => {

            // lấy lại dữ liệu bài thi ở local storage
            let newUserAnswers = JSON.parse(localStorage.getItem("userAnswers"));
            let timeRemaining = JSON.parse(localStorage.getItem("timeRemaining"));
            let questions = JSON.parse(localStorage.getItem("listQuestions"));
            let currentQuestionId = parseInt(localStorage.getItem("currentQuestionId"));
            let timeStart = parseInt(localStorage.getItem("timeStart"));
            let currentQuestionIndex = questions.findIndex(question => question.id === currentQuestionId);

            // tính toán thời gian còn lại cho các câu
            // let timeRemaining = time * 60 * 1000 - usedTime;

            let wasteTime = 0;
            let timeDoExam = 0;
            for (let i = 0; i < questions.length; i++) {
                timeDoExam += questions[i].time - timeRemaining[i].time;
                questions[i].time = timeRemaining[i].time;
            }



            let usedTime = Date.now() - new Date(timeStart);

            wasteTime = parseInt(usedTime) - timeDoExam;
            console.log(timeStart, timeDoExam, usedTime, wasteTime);
            let count = 0;
            let index = currentQuestionIndex;
            while (count < questions.length && wasteTime > 0) {

                if (timeRemaining[index].time <= wasteTime) {
                    wasteTime -= timeRemaining[index].time;
                    timeRemaining[index].time = 0;

                } else {
                    timeRemaining[index].time -= wasteTime;
                    wasteTime = 0;
                }

                questions[index].time = timeRemaining[index].time;

                count++;
                index++;
                if (index === questions.length) index = 0;

            }

            console.log(questions);


            state.userAnswers = newUserAnswers;
            state.timeRemaining = timeRemaining;
            state.listQuestions = questions;
            state.currentQuestion = { ...questions[parseInt(currentQuestionIndex)], index: currentQuestionIndex, answer: null };
        },
        setTimeRemaining: (state, action) => {
            const { questionId, timeRemaining } = action.payload;
            let newTimeRemaining = [...state.timeRemaining];
            let index = newTimeRemaining.findIndex(element => element.id === questionId);
            newTimeRemaining[index].time = timeRemaining;
            localStorage.setItem("timeRemaining", JSON.stringify(newTimeRemaining));

        },
        choseAnswer: (state, action) => {
            const { id, ans } = action.payload;
            const newListAnswers = state.userAnswers.map((element) => {
                if (element.id === id) return { id: id, ans: ans }; else return element;
            })
            localStorage.setItem("userAnswers", JSON.stringify(newListAnswers));
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
                timeRemaining.push({ id: question.id, time: question.time });
            });

            localStorage.setItem("userAnswers", JSON.stringify(newUserAnswers));
            localStorage.setItem("listQuestions", JSON.stringify(questions));
            localStorage.setItem("timeStart", JSON.stringify(timeServerStart));
            localStorage.setItem("timeRemaining", JSON.stringify(timeRemaining));
            localStorage.setItem("currentQuestionId", questions[0].id);

            state.userAnswers = newUserAnswers;
            state.timeRemaining = timeRemaining;
            state.listQuestions = questions;
            state.currentQuestion = { ...questions[0], index: 0, answer: null };

        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            if (action.payload === null) return;
            state.detailedRunningStation = null;

            localStorage.removeItem("userAnswers");
            localStorage.removeItem("listQuestions");
            localStorage.removeItem("timeStart");
            localStorage.removeItem("timeRemaining");
            localStorage.removeItem("currentQuestionId");

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
                    const userAnswers = localStorage.getItem("userAnswers");
                    if (userAnswers) {
                        userStatus = DOING
                    }
                    else {
                        userStatus = SUBMITTED
                    }
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

export const { setTimeRemaining, enterExamRoomAgain, changeQuestion, closeTimeOutDialog, questionTimeOut, openImageDialog, closeImageDialog, choseAnswer } = runningStationSlice.actions;

export default runningStationSlice.reducer;