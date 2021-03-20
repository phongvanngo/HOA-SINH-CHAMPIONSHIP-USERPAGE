import queryString from 'query-string';
import axiosClient from './../../app/AxiosClient';


export const competitionTypeApi = {
    getCompetitionTypeData: async () => {
        const params = { page: 0, pageSize: 500 };
        const url = "/session/type?" + queryString.stringify(params);

        let response = await axiosClient.get(url);
        return response;

    },

    patchCompetitionTypeInfo: async (competitionTypeInfo, competitionType_id) => {
        // const response = await fakeApi({
        //     request: competitionTypeInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = "/session/type/" + competitionType_id;
        let response = await axiosClient.patch(url, competitionTypeInfo);
        return response;
    }
}