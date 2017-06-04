import {
	REQUEST_AUTHENTICATION,
	REQUEST_FAILD,
	REQUEST_AUTHENTICATION_SUCCESS
} from '../actions'

export default function authentication(state = {
	error: null,
	status: 'init'
}, action) {
	switch (action.type) {
		case REQUEST_AUTHENTICATION:
			return Object.assign({}, state, {
				status: 'loading',
				error: null
			})
		case REQUEST_FAILD:
			return Object.assign({}, state, {
				status: 'error',
				error: action.error
			})
		case REQUEST_AUTHENTICATION_SUCCESS:
			return Object.assign({}, state, {
				status: 'success',
				user: action.user
			})

		default:
			return state
	}
}