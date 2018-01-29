import React, { Component } from 'react'
import { connect } from 'react-redux'
import {login} from './../actions'
import './../bootstrap.min.css'

class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state={
            login: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault()
        this.props.login(this.state)
    }
    render(){
		const message = this.props.message ? <div className="alert alert-danger">{this.props.message}</div> : <div></div>
        return(
            <div className="row">
				<div className="col"></div>
				<div className="col">
					<form>
						<div className="form-group">
							<input className="form-control" type="text" value={this.state.login} onChange={(e) => this.setState({login: e.target.value})} />
						</div>
						<div className="form-group">
							<input className="form-control" type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
						</div>
						<button className="btn btn-primary" onClick={this.onSubmit}>Login</button>
					</form>
					{message}
				</div>
				<div className="col"></div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        message: state.login.message
    }
)

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)