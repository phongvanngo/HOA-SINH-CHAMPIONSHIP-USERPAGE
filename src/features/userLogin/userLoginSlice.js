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
                    throw new Error("Sai tên đăng nhập hoặc mật khẩu");
                case 400:
                    throw new Error("Chưa nhập tên đăng nhập và mật khẩu");
                default:
                    throw new Error("Failed");
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
        idToken: null
    },

    reducers: {
        userLoginAgain: state => {
            state.hasLoggedIn = true;
        },

        logout: state => {
            window.localStorage.removeItem('id_token');
            state.hasLoggedIn = false;
        },
    },

    extraReducers: {
        [userLoginRequest.fulfilled]: (state, action) => {
            const data = action.payload;
            console.log(data);
            if (data === null) return;
            localStorage.setItem("id_token", data.token);
            state.hasLoggedIn = true;
        }
    }
})

export const { userLoginAgain, logout } = userLoginSlice.actions;

export default userLoginSlice.reducer;