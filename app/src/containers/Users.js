import React, { Component } from 'react'
import { connect } from 'react-redux'
import {users} from '../actions'
import {Link} from 'react-router'
import {UsersList} from '../components/usersList'
import Navigation from '../components/navigation'

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
	
	search(e){
		this.setState({
			[e.target.name] : e.target.value
		}, () =>
                this.props.getUsers([{key: 'name', value: this.state.name}, {key: 'keywords', value: this.state.keywords}]))
		

	}
    render(){
        return(
            <div>
                <Navigation active="users" />
                <div className="row">
                    <div className="col">
                        <h1>Users</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>name</label>
                            <input className="form-control" name="name" value={this.state.name} onChange={this.search} />
                        </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>keywords</label>
                                <input className="form-control" name="keywords" value={this.state.keywords} onChange={this.search} />
                            </div>
                        </div>
                </div>
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