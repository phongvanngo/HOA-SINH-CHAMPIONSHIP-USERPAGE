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



export const submitUserAnswers = createAsyncThunk(
    'userExam/createUserExamStatus',
    async (params, thunkApi) => {
        const { dispatch, getState } = thunkApi;

        try {
            dispatch(startLoading());
            const userAnswers = getState().userExam.userAnswers;
            //transfer schema
            console.log(userAnswers);
            const response = await userExamApi.putUserAnswer(userAnswers);
            dispatch(stopLoading());
            console.log(response);
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Nộp bài thi thành công", options: { variant: 'success' } }));
                    console.log("nop bai thi thanh cong");
                    dispatch(deactiveUser());
                    dispatch(stopLoading());
                    return 1;
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            console.log(error);
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
        isTimeOutDialogOpen: false

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
            console.log("timeOUt");
            state.isTimeOutDialogOpen = true;
        },

        closeTimeOutDialog: (state) => {
            state.isTimeOutDialogOpen = false;
        }

    },

    extraReducers: {
        [fetchUserExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            console.log(response_data);
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions.map((element) => { return { id: element.id, ans: null } });

            state.detailedUserExam = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.time = time;
            state.userAnswers = listAnswers;
        },

        [fetchUserExamRequest.Again]: (state, action) => {
            const response_data = action.payload;
            console.log(response_data);
            if (response_data === null) return;

            const { questions, timeServerStart, time } = response_data;
            const listAnswers = questions.map((element) => { return { id: element.id, ans: null } });

            let timeRemaining = time * 60 * 1000 - (Date.now() - Date.parse(timeServerStart));

            state.detailedUserExam = response_data;
            state.listQuestions = questions;
            state.timeStart = timeServerStart;
            state.time = timeRemaining;
            state.userAnswers = listAnswers;
        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            state.detailedUserExam = null;

        },

    }
})

export const { closeTimeOutDialog, timeOut, openImageDialog, closeImageDialog, choseAnswer } = userExamSlice.actions;

export default userExamSlice.reducer;