import { combineEpics } from 'redux-observable';
import { userLogin, userSignup } from './user';

export default combineEpics(
    userLogin,
    userSignup
);