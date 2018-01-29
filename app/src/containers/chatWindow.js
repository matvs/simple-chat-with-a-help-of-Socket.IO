import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import {UsersList} from '../components/usersList'
import {Message} from '../components/message'
import {users, sendFile, getMessages} from '../actions'
import Navigation from '../components/navigation'

class ChatWindow extends Component{
    constructor(props){
        super(props)
        this.state={
            message: "",
            content: "",
            messages: this.props.messages || [],
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
         this.props.getMessages(this.props.user_id, this.props.params.contact_id)

    }

    componentWillReceiveProps(newProps){
        if(this.props.params.contact_id !== newProps.params.contact_id)
            this.props.getMessages(this.props.user_id, newProps.params.contact_id)

        this.setState(prevState => {
            return {
                messages: newProps.messages
            }
        })
    }
    sendMessage(){
        const message = {
            text: this.state.message,
            to: this.props.params.contact_id,
            from:this.props.user_id}

        this.socket.emit("send message", message)

        this.setState(prevState => {
            return {
                messages: prevState.messages.concat(message),
                message: ""
            }
        })
		
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
                <Navigation active="chat"/>
                <div className="row">
                    <div className="col-5">
                        <input className="form-control" name="search" onChange={this.search} />
                         <UsersList users={this.props.users} online={this.props.online} />
                    </div>
                    <div className="col-7">
                        <p>
                            {this.state.messages.map((msg) => {
                                    return (<Message key={msg.timestamp} user_id={this.props.user_id} msg={msg}/>)
                                }
                                )}
                        </p>
                    </div>
                </div>
                <div className="row">

                            <div className="col-5">
                                <input className="form-control" onChange={(e) => this.setState({message:e.target.value})} value={this.state.message}/>
                            </div>
                            <div className="col-3">
                                <input className="form-control-file" name="file" type="file" ref={(input) => this.file = input} />
                            </div>
                             <div className="col">
                                 <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                             </div>
                    </div>
                </div>

        )
    }
}

const mapStateToProps = state => (
    {	
		user_id: state.login.user_id,
		socket: state.socket,
		online: state.users.online,
        users: state.users.users,
        messages: state.messages
    }
)

const mapDispatchToProps = dispatch => ({
	getUsers: (queries) => dispatch(users(queries)),
	sendFile: (data) => dispatch(sendFile(data)),
    getMessages: (from, to) => dispatch(getMessages(from, to))
 })

export default connect(mapStateToProps,mapDispatchToProps)(ChatWindow)