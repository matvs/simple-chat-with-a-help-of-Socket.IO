import * as ActionTypes from './../actions'
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

const messages = (state = {}, action) =>{
    return state
}

const login = (state = {}, action) =>{
    switch(action.type){
        case ActionTypes.LOGIN_USER_SUCCESS:
            return action.response
    }
    return state
}

const users = (state = [], action) =>{
    switch(action.type){
        case ActionTypes.GET_USERS_SUCCESS:
            return action.response
    }
    return state
}

const mainReducer = combineReducers({
    messages,
    login,
    users,
    routing: routerReducer
})

export const rootReducer = (state, action) =>{
    if(action.type === ActionTypes.LOGOUT){
        return undefined
    }

    return mainReducer(state,action)
}





