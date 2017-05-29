export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
export const REQUEST_AUTHENTICATION_FAILD = 'REQUEST_AUTHENTICATION_FAILD'
export const REQUEST_AUTHENTICATION_SUCCESS = 'REQUEST_AUTHENTICATION_SUCCESS'

export function requestAuthentication(token) {
	return {
		type: REQUEST_AUTHENTICATION
	}
}

export function requestAuthenticationFaild(error) {
	return {
		type: REQUEST_AUTHENTICATION_FAILD,
		error
	}
}

export function requestAuthenticationSuccess(user) {
	return {
		type: REQUEST_AUTHENTICATION_SUCCESS,
		user
	}
}