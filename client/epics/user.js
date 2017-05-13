import { Observable } from 'rxjs/Observable';
import {
   REQUEST_LOGIN,
   REQUEST_LOGIN_FAILD,
   REQUEST_LOGIN_SUCCESS
} from '../actions';
import {
   AuthService
} from '../api';
const userLogin = (action$) => action$.ofType(REQUEST_LOGIN)
   .mergeMap(action => AuthService.requestLogin(action.username, action.password)
      .map(userInfo => {
         const token = userInfo.token;
         localStorage.setItem('token', token);
         return ({type: REQUEST_LOGIN_SUCCESS, token});
      }))
      .catch(error => Observable.of({
         type: REQUEST_LOGIN_FAILD,
         error
      }));
      
export {
   userLogin
}
