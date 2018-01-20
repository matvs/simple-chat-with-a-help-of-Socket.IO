import React, { Component } from 'react'
import { connect } from 'react-redux'
import {users} from '../actions'
import {Link} from 'react-router'

class UsersList extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getUsers(this.props.token)
    }
    render(){
        return(
            <div>
                <h1>Users List</h1>
                <ul>
                {this.props.users.map((user) => {
                    return (
                        <li key={user._id}><Link to={"messages/"+user._id}>{user.login}</Link> { this.props.online.indexOf(user._id) > -1 ? "online" : "offline"}</li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        token: state.login.token,
		online: state.users.online,
        users: state.users.users
    }
)

const mapDispatchToProps = dispatch => ({
    getUsers: (token) => dispatch(users(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersList)