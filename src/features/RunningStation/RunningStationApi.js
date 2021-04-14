import axiosClient from '../../app/AxiosClientUser';
import { ConstUserExamStatus } from '../../app/const.app';
import { fakeApi } from './../../app/fakeApi';
import { fakeListQuestions } from './fakedata';



export const runningStationApi = {
    getRunningStation: async () => {
        const url = "/test";
        let response = await fakeApi({ request: null, response: { data: { rows: fakeListQuestions }, status: 200 }, timeOut: 2000 })
        return response;

    },

    getRunningStationStatus: async () => {
        const url = "/test/check";
        let response = await fakeApi({ request: null, response: { data: { userStatus: ConstUserExamStatus.READY, sessionStatus: true }, status: 200 }, timeOut: 1000 })
        return response;
    },


    putUserAnswer: async (userAnswer) => {
        const url = "/test";
        let response = await axiosClient.post(url, { arrayAns: JSON.stringify(userAnswer) });
        return response;
    },
}