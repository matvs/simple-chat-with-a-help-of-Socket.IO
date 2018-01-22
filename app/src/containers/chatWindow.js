import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import {UsersList} from '../components/usersList'
import {Message} from '../components/message'
import {users, sendFile} from '../actions'

class ChatWindow extends Component{
    constructor(props){
        super(props)
        this.state={
            message: "",
            content: "",
            messages: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
		this.search = this.search.bind(this)
        this.socket = props.socket
		this.socket.on("receive message", function(msg){
            this.setState(prevState => {
                return {
                    messages: prevState.messages.concat(msg)
                }
            })
        }.bind(this))

    }
	
	 componentDidMount() {
        this.props.getUsers()
    }
	
    sendMessage(){
        this.socket.emit("send message", {
                text: this.state.message,
                to: this.props.params.contact_id,
                from:this.props.user_id})

        this.setState({message:""})
		
		if(this.file.files[0])
		{
			this.props.sendFile({
				to: this.props.params.contact_id,
                from:this.props.user_id,
				file:this.file.files[0]
			})
			this.file.value=""
		}
    }
	
	search(e){
		const value = e.target.value
		this.props.getUsers([{key: 'name', value}])
	}
    render(){
        return(
            <div>
				<input name="search" onChange={this.search} />
				<UsersList users={this.props.users} online={this.props.online} />
                <p>
                    {this.state.messages.map((msg) => {
                            return (<Message key={msg.timestamp} user_id={this.props.user_id} msg={msg}/>)
                        }
                        )}
                </p>
                <input onChange={(e) => this.setState({message:e.target.value})} value={this.state.message}/>
				<input name="file" type="file" ref={(input) => this.file = input} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {	
		user_id: state.login.user_id,
		socket: state.socket,
		online: state.users.online,
        users: state.users.users
    }
)

const mapDispatchToProps = dispatch => ({
	getUsers: (queries) => dispatch(users(queries)),
	sendFile: (data) => dispatch(sendFile(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatWindow)