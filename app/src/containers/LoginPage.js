import React, { Component } from 'react'
import { connect } from 'react-redux'
import {login} from './../actions'

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
        return(
            <div>
                <form>
                    <input type="text" value={this.state.login} onChange={(e) => this.setState({login: e.target.value})} />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    <button onClick={this.onSubmit}>Login</button>
                    <p>{this.props.message}</p>
                </form>
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