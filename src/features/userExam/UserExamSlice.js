import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { userExamApi } from './UserExamApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';
import { deactiveUser } from './../userLogin/userLoginSlice';



export const fetchUserExamRequest = createAsyncThunk(
    'userExam/fetchUserExamStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await userExamApi.getUserExam();

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
export const fetchUserExamRequestAgain = createAsyncThunk(
    'userExam/fetchUserExamStatusAgain',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await userExamApi.getUserExam();

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
export const checkUserExamStatus = createAsyncThunk(
    'userExam/checkUserExamStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await userExamApi.getUserExamStatus();

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
    'userExam/createUserExamStatus',
    async (params, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        try {
            dispatch(startLoading());
            const userAnswers = getState().userExam.userAnswers;
            //transfer schema
            const response = await userExamApi.putUserAnswer(userAnswers);
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

export const userExamSlice = createSlice({
    name: 'userExam',
    initialState: {
        // listQuestions:null,
        // listAnswers:null,
        // timeStart:null,
        // timeToDo: null,
        // detailedUserExam: fakeDetailedExam,
        // listQuestions: fakeListQuestions,

        detailedUserExam: null,
        listQuestions: null,
        userAnswers: null,
        time: null,
        timeStart: null,
        openingImage: null,
        isTimeOutDialogOpen: false,
        userExamStatus: null,
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
        [fetchUserExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions.map((element) => { return { id: element.id, ans: null } });

            state.detailedUserExam = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.time = time * 60;
            state.timeToDo = time;
            state.userAnswers = listAnswers;
        },

        [fetchUserExamRequestAgain.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions ? questions.map((element) => { return { id: element.id, ans: null } }) : [];

            let usedTime = Date.now() - Date.parse(timeServerStart);
            let timeRemaining = time * 60 * 1000 - usedTime;



            state.detailedUserExam = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.timeToDo = time;
            state.time = isNaN(timeRemaining) ? 0 : Math.floor(timeRemaining / 1000);
            state.userAnswers = listAnswers;
        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            if (action.payload === null) return;
            state.detailedUserExam = null;
        },
        [checkUserExamStatus.fulfilled]: (state, action) => {
            const { message } = action.payload;

            switch (message) {
                case "User had submited this exam":
                    state.userExamStatus = 2;
                    break;

                case "You are doing exam":
                    state.userExamStatus = 1;
                    break

                case "you already to start exam":
                    state.userExamStatus = 0;
                    break;


                case "This exam is current not available":
                    state.userExamStatus = 3;
                    break;

                case "It's over time":
                    state.userExamStatus = 2;
                    break;

                default:
                    break;
            }


        },

    }
})

export const { closeTimeOutDialog, timeOut, openImageDialog, closeImageDialog, choseAnswer } = userExamSlice.actions;

export default userExamSlice.reducer;