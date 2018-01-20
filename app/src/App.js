import React, { Component } from 'react';
import {connect} from'react-redux'
import logo from './logo.svg';
import './App.css';
import oldPage from './components/oldPage'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {Provider} from 'react-redux'
import {createReduxStore} from './createStore'
import UsersList from './containers/UsersList'
import LoginPage from './containers/LoginPage'
import chatWindow from "./containers/chatWindow";


const store = createReduxStore()
const history = syncHistoryWithStore(browserHistory,store)
class App extends Component {
  render() {
    var startPage = this.props.token ?
        <Router history={history}>
            <Route path="/" component={UsersList}/>
            <Route path="messages/:contact_id" component={chatWindow}/>
        </Router>
        : <LoginPage />
    return (
        <Provider store = {store} >
            {startPage}
        </Provider>
    );
  }
}

function connectWithStore(mapStateToProps,mapDispatchToProps, component){
    const WrappedComponent = connect(mapStateToProps,mapDispatchToProps)(component)
    return function Wrapper(){
        return <WrappedComponent store={store}/>
    }
}
const mapStateToProps = state => ({
    token: state.login.token
})
const mapDispatchToProps = dispatch => ({

})
export default connectWithStore(mapStateToProps,mapDispatchToProps,App)
