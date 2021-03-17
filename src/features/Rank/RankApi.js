import queryString from 'query-string';
import axiosClient from './../../app/AxiosClient';


export const rankApi = {
    getRankData: async (params) => {
        const params = { page: 0, pageSize: 10 };
        const url = "/rank?" + queryString.stringify(params);

        let response = await axiosClient.get(url);
        return response;

    },


}