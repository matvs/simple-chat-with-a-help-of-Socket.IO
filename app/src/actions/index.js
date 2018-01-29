import {CALL_API, API_ROOT} from './../middleware'
import download from 'downloadjs'

function buildQuery(queries = []){
	return '?' + queries.map((query) => query['key'] + '=' + query['value']).join('&')
}

export const LOGOUT = "LOGOUT"
export const logout = () => {
    return {
        type: LOGOUT
    }
}

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
        endpoint : "upload",
        method: 'POST',
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

export const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST"
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS"
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE"

export const getMessages = (from, to) => ({
    [CALL_API] : {
        endpoint : "messages/" + from + '/' + to,
        method: 'GET',
        types: [GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE]
    }
})

export const DOWNLOAD_FILE_REQUEST = "DONWLOAD_FILE_REQUEST"
export const DONWLOAD_FILE_SUCCESS = "DONWLOAD_FILE_SUCCESS"
export const DONWLOAD_FILE_FAILURE = "DONWLOAD_FILE_FAILURE"

export const downloadFile = (path,token) => {
        const endpoint = API_ROOT + "downloadfile/" + path

        return (dispatch) => {
            dispatch({type: DOWNLOAD_FILE_REQUEST})
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => response.blob().then(blob => {download(blob,'file.txt',"text/plain"), dispatch({type: DONWLOAD_FILE_SUCCESS})}),
                err => dispatch({type:DONWLOAD_FILE_FAILURE, err}))

        }
}

export const REGISTER_SOCKET = "REGISTER_SOCKET"

export const registerSocket = (socket) => ({
		type: REGISTER_SOCKET,
		socket
	})

export const REGISTER_API_DATA = "REGISTER_API_DATA"

export const registerApiData = (apiData) => ({
    type: REGISTER_API_DATA,
    apiData
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



