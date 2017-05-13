import { Observable } from 'rxjs/Observable';
import {
   REQUEST_LOGIN,
   REQUEST_LOGIN_FAILD,
   REQUEST_LOGIN_SUCCESS
} from '../actions'

const userLogin = (action$) => action$.ofType(REQUEST_LOGIN)