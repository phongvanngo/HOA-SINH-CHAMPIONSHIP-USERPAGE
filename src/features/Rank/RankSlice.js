import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { rankApi } from './RankApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';
import { StarRateSharp } from "@material-ui/icons";
import { closeUniversityFormDialog } from "../universityManagement/UniversitySlice";

const rowsPerPageRank = 10;

export const fetchRankSingleRequest = createAsyncThunk(
    'rank/fetchRankSingleStatus',
    async ({ reloadAll, searchValue }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch, getState } = thunkApi;
        try {
            dispatch(startLoading());
            const { currentPage } = getState().rank.singleRank;
            let requestParams;
            if (reloadAll === true) {
                requestParams = {
                    page: 0,
                    pageSize: rowsPerPageRank,
                    typeId: 1,
                }
            }
            else {
                requestParams = {
                    page: currentPage + 1,
                    pageSize: rowsPerPageRank,
                    typeId: 1,
                }
            }
            let response = null;
            if (searchValue.trim() === "") {
                response = await rankApi.getRankData(requestParams);
            }
            else {
                //sercbh
                response = await rankApi.getRankByUserCode({ ...requestParams, userCode: searchValue });
            }

            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    // dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return { ...response.data, reloadAll: reloadAll };
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
export const fetchRankTeamRequest = createAsyncThunk(
    'rank/fetchRankTeamStatus',
    async ({ reloadAll, searchValue, universityId }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch, getState } = thunkApi;
        try {
            dispatch(startLoading());
            const { currentPage } = getState().rank.teamRank;
            let requestParams;
            if (reloadAll === true) {
                requestParams = {
                    page: 0,
                    pageSize: rowsPerPageRank,
                    typeId: 2,
                    universityId: universityId
                }
            }
            else {
                requestParams = {
                    page: currentPage + 1,
                    pageSize: rowsPerPageRank,
                    typeId: 2,
                    universityId: universityId
                }
            }
            let response = null;
            if (searchValue.trim() === "") {
                response = await rankApi.getRankData(requestParams);
            }
            else {
                //sercbh
                response = await rankApi.getRankByUserCode({ ...requestParams, userCode: searchValue });
            }

            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    // dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return { ...response.data, reloadAll: reloadAll };
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
        singleRank: {
            rows: [],
            count: 0,
            currentPage: -1,
            rowsPerPage: rowsPerPageRank,
        },
        teamRank: {
            rows: [],
            count: 0,
            currentPage: -1,
            rowsPerPage: rowsPerPageRank,
        },

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
        [fetchRankSingleRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            //chuyển đổi schema
            let ranks = response_data.rows.map((element) => {
                const { id, fullName, time, score } = element;
                return {
                    id: id, fullName: fullName, time: time, score: score
                }
            }
            )

            // ranks = ranks.filter(element => element.time !== null);

            if (response_data.reloadAll === false) {
                state.singleRank = {
                    rowsPerPage: rowsPerPageRank,
                    count: response_data.count,
                    currentPage: state.singleRank.currentPage + 1,
                    rows: [...state.singleRank.rows, ...ranks]
                };

            } else {
                //load lại toàn bộ
                state.singleRank = {
                    rowsPerPage: rowsPerPageRank,
                    count: response_data.count,
                    currentPage: 0,
                    rows: [...ranks]
                };
            }
        },
        [fetchRankTeamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            console.log("team response", response_data);
            if (response_data === null) return;

            //chuyển đổi schema
            let ranks = response_data.rows.map((element) => {
                const { id, fullName, time, score } = element;
                return {
                    id: id, fullName: fullName, time: time, score: score
                }
            }
            )

            // ranks = ranks.filter(element => element.time !== null);

            if (response_data.reloadAll === false) {
                state.teamRank = {
                    rowsPerPage: rowsPerPageRank,
                    count: response_data.count,
                    currentPage: state.teamRank.currentPage + 1,
                    rows: [...state.teamRank.rows, ...ranks]
                };

            } else {
                //load lại toàn bộ
                state.teamRank = {
                    rowsPerPage: rowsPerPageRank,
                    count: response_data.count,
                    currentPage: 0,
                    rows: [...ranks]
                };
            }
        },

    }
})

export const { } = rankSlice.actions;

export default rankSlice.reducer;