import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { userExamApi } from './UserExamApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';

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

export const submitUserAnswers = createAsyncThunk(
    'userExam/createUserExamStatus',
    async (userExamInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());

            //transfer schema
            const { userExam_name, question, total_score } = userExamInfo;
            const newUserExam = { name: userExam_name, totalQuestionUserMustDo: question, maxScore: total_score };

            const response = await userExamApi.putUserAnswer(newUserExam);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, userExamInfo };
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

        detailedUserExam: null,

    },

    reducers: {

    },

    extraReducers: {
        [fetchUserExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            console.log(response_data);
            if (response_data === null) return;

            state.detailedUserExam = response_data;

        },
        [submitUserAnswers.fulfilled]: (state, action) => {
            state.detailedUserExam = null;
        },

    }
})

export const { } = userExamSlice.actions;

export default userExamSlice.reducer;