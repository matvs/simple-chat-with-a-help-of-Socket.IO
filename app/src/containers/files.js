import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getFiles, users, downloadFile} from './../actions'
import { Link } from 'react-router'
import Navigation from '../components/navigation'

class Files extends Component{
    constructor(props){
        super(props)
     }

    componentDidMount(){
		this.props.getFiles(this.props.params.type)
		if(this.props.users.length == 0) 
			this.props.getUsers()
	}

	componentWillReceiveProps(newProps){
		if(this.props.params.type !== newProps.params.type)
			this.props.getFiles(newProps.params.type)
	}
    render(){
        const apiData = JSON.parse(localStorage.getItem('apiData'))
        let token
        if(apiData){
            token = apiData.token
        }
		const description = this.props.params.type == 'sent' ? 'File sent to ' 
		: 'File received from '
		const getUserNameById = (id) => this.props.users.find((user) => user._id == id)
        const files = this.props.params.type == 'sent' ? this.props.files_sent : this.props.files_received
		return(	
            <div>
				<Navigation active={this.props.params.type}/>
				<div className="row">
					<ul>
					{files.map((file) => {
						let prettyName = file.name.split('-')
						prettyName.shift()
						prettyName = prettyName.join('-')
						const user = this.props.params.type == 'sent' ? getUserNameById(file.to) : getUserNameById(file.from)
						const userLink = user ? (this.props.params.type == 'sent' ? <Link to={"messages/"+ file.to}>{user.first_name + " " + user.second_name}</Link>
							: <Link to={"messages/"+user.from}>{user.first_name + " " + user.second_name}</Link>) : <div></div>
						return(
							<li key={file.name}><a onClick={() => this.props.downloadFile(file.from + "/" + file.to + "/" + file.name, token, prettyName)} href="#" >
								{prettyName}
							</a> {description} {userLink}</li>
						)
					})}
					</ul>
				</div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        files_sent: state.files.sent,
		files_received: state.files.received,
		users: state.users.users,
    }
)

const mapDispatchToProps = dispatch => ({
	getFiles : (type) => dispatch(getFiles(type)),
	getUsers: (queries) => dispatch(users(queries)),
	downloadFile : (path, token, name) => dispatch(downloadFile(path, token, name))
})

export default connect(mapStateToProps,mapDispatchToProps)(Files)