import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { rankApi } from './RankApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchRankRequest = createAsyncThunk(
    'rank/fetchRankStatus',
    async (params, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await rankApi.getRankData();

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



export const rankSlice = createSlice({
    name: 'rank',
    initialState: {
        listRanks: [],
        isRankDialogOpen: false,
        rankEditing: null,
        // {
        //     id: null,
        //     rank_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // }
        detailedChosenRank: null
    },

    reducers: {

    },

    extraReducers: {
        [fetchRankRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            console.log(response_data);
            if (response_data === null) return;

            //chuyển đổi schema
            let ranks = response_data.rows.map((element) => {
                const { id, name, maxScore, totalQuestionUserMustDo, countQuestion } = element;
                return {
                    id: id,
                    rank_name: name,
                    question: totalQuestionUserMustDo,
                    total_score: maxScore,
                    available_question: countQuestion
                }
            }
            )

            state.listRanks = [...ranks];

        },

    }
})

export const { } = rankSlice.actions;

export default rankSlice.reducer;