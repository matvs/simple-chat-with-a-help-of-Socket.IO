import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
class ChatWindow extends Component{
    constructor(props){
        super(props)
        this.state={
            message: "",
            content: "",
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.socket = props.socket
		this.socket.on("receive message", function(msg){
            this.setState(prevState => {
                return {
                    messages: prevState.messages.concat(msg)
                }
            })
        }.bind(this))

    }

    sendMessage(){
        this.socket.emit("send message", {
                text: this.state.message,
                to: this.props.params.contact_id,
                from:this.props.user_id})

        this.setState({message:""})
    }

    render(){
        return(
            <div>
                <p>
                    {this.state.messages.map((msg) => {
                            return (<span>{msg.text}</span>)
                        }
                        )}
                </p>
                <input onChange={(e) => this.setState({message:e.target.value})} value={this.state.message}/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {	
		user_id: state.login.user_id
		socket: state.socket
    }
)

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(ChatWindow)