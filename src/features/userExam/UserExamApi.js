import axiosClient from './../../app/AxiosClientUser';


export const userExamApi = {
    getUserExam: async () => {
        const url = "/test";
        let response = await axiosClient.get(url);
        return response;

    },


    putUserAnswer: async (userAnswer) => {
        const url = "/test";
        console.log('submit ', { arrayAns: userAnswer });
        let response = await axiosClient.post(url, { arrayAns: JSON.stringify(userAnswer) });
        return response;
    },
}