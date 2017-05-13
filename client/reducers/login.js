import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_FAILD,
	REQUEST_LOGIN_SUCCESS,
	RESET_LOGIN_STATUS
} from '../actions'

const initState = {
	error: null,
	status: 'init',
	token: null
}

export default function login(state = initState, action) {
	switch (action.type) {
		case REQUEST_LOGIN:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
		case REQUEST_LOGIN_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
		case REQUEST_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				token: action.token
			})
		case RESET_LOGIN_STATUS:
			return initState
		default:
			return state
	}
}