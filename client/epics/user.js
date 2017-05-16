import { Observable } from 'rxjs/Observable';
import {
   REQUEST_LOGIN,
   REQUEST_LOGIN_FAILD,
   REQUEST_LOGIN_SUCCESS,
   REQUEST_SIGNUP_USER,
   REQUEST_SIGNUP_USER_SUCCESS,
   REQUEST_FAILD
} from '../actions';
import {
   AuthService,
   UserService
} from '../api';
const authService = new AuthService();
const userService = new UserService();

const userLogin = (action$) => action$.ofType(REQUEST_LOGIN)
   .mergeMap(action => authService.requestLogin(action.username, action.password)
      .then(userInfo => {
         const token = userInfo.token;
         localStorage.setItem('token', token);
         return ({ type: REQUEST_LOGIN_SUCCESS, token });
      }))
   .catch(error => Observable.of({
      type: REQUEST_LOGIN_FAILD,
      error
   }));

const userSignup = (action$) => action$.ofType(REQUEST_SIGNUP_USER)
   .mergeMap(action => userService.requestSignupUser(action.displayName, action.password, action.username)
      .then(() => ({
         type: REQUEST_SIGNUP_USER_SUCCESS,
         displayName: action.displayName,
         username: action.username
      })))
   .catch(error => Observable.of({
      type: REQUEST_FAILD,
      error
   }));


export {
   userLogin,
   userSignup
}
