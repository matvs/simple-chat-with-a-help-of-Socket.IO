import {CALL_API} from './../middleware'
function buildQuery(queries){
	return '?' + queries.map((query) => query['key'] + '=' + query['value']).join('&')
}

export const LOGOUT = "LOGOUT"

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE"

export const login = (data) => ({
    [CALL_API] : {
        endpoint : "login/",
        method: 'POST',
        payload: data,
        types: [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE]

    }
})

export const GET_USERS_REQUEST = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const GET_USERS_FAILURE = "GET_USERS_FAILURE"

export const users = (queries) => ({
    [CALL_API] : {
        endpoint : "users" + buildQuery(queries),
        method: 'GET',
        types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
    }
})

export const SEND_FILE_REQUEST = "SEND_FILE_REQUEST"
export const SEND_FILE_SUCCESS = "SEND_FILE_SUCCESS"
export const SEND_FILE_FAILURE = "SEND_FILE_FAILURE"

export const sendFile = (data) => ({
    [CALL_API] : {
        endpoint : "upload/",
        method: 'PUT',
        payload: data,
        types: [SEND_FILE_REQUEST, SEND_FILE_SUCCESS, SEND_FILE_FAILURE]
	}
})

export const GET_FILES_REQUEST = "GET_FILES_REQUEST"
export const GET_FILES_SUCCESS = "GET_FILES_SUCCESS"
export const GET_FILES_FAILURE = "GET_FILES_FAILURE"

export const getFiles = (type) => ({
    [CALL_API] : {
        endpoint : "files/" + type,
        method: 'GET',
        types: [GET_FILES_REQUEST, GET_FILES_SUCCESS, GET_FILES_FAILURE]
	}
})

export const REGISTER_SOCKET = "REGISTER_SOCKET"

export const registerSocket = (socket) => ({
		type: REGISTER_SOCKET,
		socket
	})
	
export const NEW_USER_ONLINE = "NEW_USER_ONLINE"
export const NEW_USER_OFFLINE = "NEW_USER_OFFLINE"

export const newUserOnline = (user_id) => ({
	type: NEW_USER_ONLINE,
	user_id
})

export const newUserOffline = (user_id) => ({
	type: NEW_USER_OFFLINE,
	user_id
})



