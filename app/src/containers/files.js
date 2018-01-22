import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getFiles, users} from './../actions'

class Files extends Component{
    constructor(props){
        super(props)
     }

    componentDidMount(){
		this.props.getFiles(this.props.params.type)
		if(this.props.users.length == 0) 
			this.props.getUsers()
	}
    render(){
		const description = this.props.params.type == 'sent' ? 'File sent to ' 
		: 'File received from '
		const getUserNameById = (id) => this.props.users.find((user) => user._id == id)
        const files = this.props.params.type == 'sent' ? this.props.files_sent : this.props.files_received
		return(	
            <div>
				<ul>
				{files.map((file) => {
					const user = this.props.params.type == 'sent' ? getUserNameById(file.to) : getUserNameById(file.from)
					const userLink = this.props.params.type == 'sent' ? <Link to={"messages/"+ file.to}>{user.first_name + " " + user.second_name}</Link>
					: <Link to={"messages/"+user.from}>{user.first_name + " " + user.second_name}</Link>
					return(
						<li key={file.name}><a target="_blank" href={window.location.host + "/api/" + file.to + "/" file.name}
							{file.name}
						</a>{description} {userLink}</li>
					)
				})}
				</ul>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        files_sent: state.files.sent,
		files_received: state.files.received
		users: state.users.users
    }
)

const mapDispatchToProps = dispatch => ({
	getFiles = (type) => dispatch(getFiles(type)),
	getUsers: (queries) => dispatch(users(queries))
})

export default connect(mapStateToProps,mapDispatchToProps)(Files)