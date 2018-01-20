import {createStore, applyMiddleware, compose} from 'redux'
import {api, thunk} from './../middleware'
import {rootReducer} from "./../reducers"

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(api, thunk),
    // other store enhancers if any
);

export const createReduxStore = () => createStore(rootReducer,enhancer)