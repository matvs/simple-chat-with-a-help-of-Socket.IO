import React, { Component } from 'react';
import {connect} from'react-redux'
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'
import oldPage from './components/oldPage'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import {createReduxStore} from './createStore'
import Users from './containers/Users'
import LoginPage from './containers/LoginPage'
import ChatWindow from "./containers/chatWindow";
import Files from "./containers/files"
import {registerSocket, newUserOnline, newUserOffline} from './actions'

const SOCKET_URL = "localhost:8082"
const store = createReduxStore()
const history = syncHistoryWithStore(browserHistory,store)
class App extends Component {
  render() {
    var startPage = this.props.token ?
        <Router history={history}>
            <Route path="/" component={Users}/>
            <Route path="messages/:contact_id" component={ChatWindow}/>
			<Route path="files/:type" component={Files}/>
        </Router>
        : <LoginPage />
		
		if(this.props.token && !this.props.socket){
			const socket = io(SOCKET_URL)
			let oldEmit = socket.emit
			socket.emit = function(event, data){
				return oldEmit(event,Object.assign({},{user_id:this.props.user_id, token:this.props.token}, data))
			}
			socket.emit("user id")
			socket.on("new_user_online",function(data){
				this.props.newUserOnline(data.user_id)
			})
			socket.on("new_user_offline",function(data){
				this.props.newUserOffline(data.user_id)
			})
			this.props.registerSocket(socket)
		}
    return (
        <Provider store = {store} >
			<div className="container">
				{startPage}
			</div>
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
	user_id: state.login.user_id
	socket: state.socket
})
const mapDispatchToProps = dispatch => ({
	registerSocket: (socket) => dispatch(registerSocket(socket)),
	newUserOnline: (user_id) => dispatch(newUserOnline(user_id)),
	newUserOffline: (user_id) => dispatch(newUserOffline(user_id)),
})
export default connectWithStore(mapStateToProps,mapDispatchToProps,App)
