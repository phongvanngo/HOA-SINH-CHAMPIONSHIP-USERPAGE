import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userLoginApi from './userLoginApi';
import { notify } from './../../common/component/Notifier/notifierSlice';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const userLoginRequest = createAsyncThunk(
    'user/userLoginRequestStatus',
    async (userLoginInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        try {
            const response = await userLoginApi.sendLoginInfo(userLoginInfo);
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return response.data;
                case 401:
                    throw new Error("Mã dự thi không đúng");
                case 400:
                    throw new Error("Bạn cần nhập mã dự thi");
                default:
                    throw new Error("Đăng nhập thất bại");
            }
        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    }
)

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        hasLoggedIn: false,
        idToken: null,
        user: null,
    },

    reducers: {
        userLoginAgain: state => {
            const user = localStorage.getItem('user');
            state.user = JSON.parse(user);

            state.hasLoggedIn = true;

        },

        logout: state => {
            window.localStorage.removeItem('id_user_token');
            state.hasLoggedIn = false;
        },
    },

    extraReducers: {
        [userLoginRequest.fulfilled]: (state, action) => {
            let response_data = action.payload;
            if (response_data === null) return;
            const { token, user } = response_data;
            // const {code,fullName,sessionName,isActive} = data.user;

            localStorage.setItem("id_user_token", token);
            localStorage.setItem("user", JSON.stringify(user));

            state.hasLoggedIn = true;
            state.user = user;
        }
    }
})

export const { userLoginAgain, logout } = userLoginSlice.actions;

export default userLoginSlice.reducer;