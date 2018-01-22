import React, { Component } from 'react'
import { connect } from 'react-redux'
import {users} from '../actions'
import {Link} from 'react-router'
import {UsersList} from '../components/usersList'

class Users extends Component{
    constructor(props){
        super(props)
		this.search = this.search.bind(this)
		this.state = {
			name: "",
			keywords: ""
		}
    }

    componentDidMount() {
        this.props.getUsers()
    }
	
	search(){
		this.setState({
			[e.target.name] : e.target.value
		})
		
		this.props.getUsers([{key: 'name', value: this.state.name}, {key: 'keywords', value: this.state.keywords}])
	}
    render(){
        return(
            <div>
                <h1>Users</h1>
				<label>name</label>
				<input name="name" value={this.state.name} onChange={this.search} />
				<label>keywords</label>
				<input name="keywords" value={this.state.keywords} onChange={this.search} />
                <UsersList users={this.props.users} online={this.props.online} />
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
		online: state.users.online,
        users: state.users.users
    }
)

const mapDispatchToProps = dispatch => ({
    getUsers: (queries) => dispatch(users(queries))
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)