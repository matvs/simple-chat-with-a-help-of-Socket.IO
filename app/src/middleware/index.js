const API_ROOT = "http://localhost:8082/api/"

const callApi = (endpoint, method = 'GET',payload = {}, headers = {}) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    let properties = {
        method: method,
        headers
    }

    if(method != 'GET' && method != 'HEAD'){
        if(payload.file){
			const formData - new FormData()
			for(key in payload){
				formData.append(key,payload[key])
			}
			properties['body'] = formData
		} else {
			properties['body'] = JSON.stringify(payload);
			properties.headers['Content-Type'] = 'application/json'
		}
	}

    return fetch(fullUrl,properties)
        .then(response =>
            response.json().then(json => {
                if(!response.ok){
                    return Promise.reject(json)
                }
                return json
            })
        )
}

export const CALL_API = "CALL API"

export const api = store => next => action => {
    const callAPI = action[CALL_API]
    if(typeof callAPI === 'undefined'){
        return next(action)
    }

    let { endpoint } = callAPI
    const { payload, method, types, headers } = callAPI
	
	const token = store.getState().login.token
	if(token){
		if(!headers) headers = {}
		headers['Authorization'] = 'Bearer ' + token
	}
	
    const actionWith = data => {
        const finalAction = Object.assign({},action,data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType}))

    return callApi(endpoint,method,payload, headers).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}


export const thunk = ({dispatch, getState}) => next => action => {
    if(typeof action === 'function')
        return action(dispatch,getState)

    return next(action)
}