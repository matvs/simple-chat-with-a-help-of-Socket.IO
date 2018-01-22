import * as ActionTypes from './../actions'
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

const messages = (state = {}, action) =>{
    return state
}

const login = (state = {token:null,user_id:null}, action) =>{
    switch(action.type){
        case ActionTypes.LOGIN_USER_SUCCESS:
            return action.response
    }
    return state
}

const users = (state = { users: [], online: []}, action) =>{
    switch(action.type){
        case ActionTypes.GET_USERS_SUCCESS:
            return {...state, users: action.response}
		case ActionTypes.NEW_USER_ONLINE:
			return {...state, online: state.online.concat(action.user_id)}
		case ActionTypes.NEW_USER_OFFLINE:
			//const index = state.online.findIndex((user_id) => user_id == action.user_id)
			const index = state.online.indexOf(action.user_id)
			return {...state, online: [...state.online.slice(0,index),...state.online.slice(index+1)]}
    }
    return state
}

const socket = (state = null, action) => {
	switch(action.type){
		case ActionTypes.REGISTER_SOCKET:
			return action.socket
	}
	return state
}

const files = (state = {sent: [], received: []}, action) =>{
    switch(action.type){
        case ActionTypes.GET_FILES_SUCCESS:
            return {...state,[action.response.type]:action.response.files}
    }
    return state
}
const mainReducer = combineReducers({
    messages,
    login,
    users,
	socket,
	files,
    routing: routerReducer
})

export const rootReducer = (state, action) =>{
    if(action.type === ActionTypes.LOGOUT){
        return undefined
    }

    return mainReducer(state,action)
}





