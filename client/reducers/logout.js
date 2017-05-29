import {
	REQUEST_LOGOUT,
	REQUEST_LOGOUT_FAILD,
	REQUEST_LOGOUT_SUCCESS,
	RESET_LOGOUT_STATUS
} from '../actions'

const initState = {
	error: null,
	status: 'init'
}

export default function logout(state = initState, action) {
	switch (action.type) {
		case REQUEST_LOGOUT:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
		case REQUEST_LOGOUT_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
		case REQUEST_LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				status: 'success'
			})
		case RESET_LOGOUT_STATUS:
			return initState
		default:
			return state
	}
}