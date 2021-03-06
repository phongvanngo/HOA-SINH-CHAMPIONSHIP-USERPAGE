import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from './../features/login/loginSlice';
import loadingReducer from '../common/component/PageLoader/loadingSlice';
import examReducer from './../features/examManagement/ExamSlice';
import notifierReducer from './../common/component/Notifier/notifierSlice';
import questionReducer from './../features/questionManagement/questionSlice';
import contestSessionReducer from '../features/ContestSessionManagement/ContestSessionSlice';
import userReducer from './../features/userManagement/UserSlice';
import universityReducer from './../features/universityManagement/UniversitySlice';
import userLoginReducer from './../features/userLogin/userLoginSlice';
import userExamReducer from '../features/userExam/UserExamSlice';
import competitionTypeReducer from './../features/CompetitionType/CompetitionTypeSlice';
import rankReducer from './../features/Rank/RankSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    loading: loadingReducer,
    exam: examReducer,
    notifier: notifierReducer,
    question: questionReducer,
    contestSession: contestSessionReducer,
    user: userReducer,
    university: universityReducer,
    userLogin: userLoginReducer,
    userExam: userExamReducer,
    competitionType: competitionTypeReducer,
    rank: rankReducer,
  },
});
