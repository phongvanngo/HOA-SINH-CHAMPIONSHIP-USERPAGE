import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { competitionTypeApi } from './CompetitionTypeApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchCompetitionTypeRequest = createAsyncThunk(
    'competitionType/fetchCompetitionTypeStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await competitionTypeApi.getCompetitionTypeData();

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

export const updateCompetitionTypeRequest = createAsyncThunk(
    'competitionType/editCompetitionTypeStatus',
    async (competitionTypeInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());

            const response = await competitionTypeApi.patchCompetitionTypeInfo(competitionTypeInfo, competitionTypeInfo.id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thành công", options: { variant: 'success' } }));
                    return { data: response.data, competitionTypeInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const competitionTypeSlice = createSlice({
    name: 'competitionType',
    initialState: {
        listCompetitionTypes: null,
    },

    reducers: {

    },

    extraReducers: {
        [fetchCompetitionTypeRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            //chuyển đổi schema
            let competitionTypes = response_data.rows.map((element) => {
                const { id, time } = element;
                return {
                    id: id,
                    time: time
                }
            }
            )

            state.listCompetitionTypes = [...competitionTypes];

        },
        [updateCompetitionTypeRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { competitionTypeInfo } = response_data;
            const newListCompetitionTypes = state.listCompetitionTypes.map((competitionType) => {
                if (competitionType.id === competitionTypeInfo.id)
                    return {
                        ...competitionType,
                        ...competitionTypeInfo
                    }
                else
                    return { ...competitionType };
            })

            state.listCompetitionTypes = newListCompetitionTypes;
        },

    }
})

// export const { } = competitionTypeSlice.actions;

export default competitionTypeSlice.reducer;