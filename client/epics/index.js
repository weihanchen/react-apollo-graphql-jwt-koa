import { combineEpics } from 'redux-observable';
import { userLogin } from './user';

export default combineEpics(
    userLogin
);