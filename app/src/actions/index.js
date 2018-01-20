import {CALL_API} from './../middleware'

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

export const users = (token) => ({
    [CALL_API] : {
        endpoint : "users",
        method: 'GET',
        types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
        headers:{'Authorization': 'Bearer ' + token}
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



