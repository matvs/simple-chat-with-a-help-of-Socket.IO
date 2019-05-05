import React, { Component } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../actions'

class Navigation extends Component{
    constructor(params){
        super(params)
        this.getClassName = this.getClassName.bind(this)
    }

    getClassName(link){
        return this.props.active == link ? "nav-link active" : "nav-link"
    }

    render(){
        return (
            <div className="row">
                <ul className="nav">
                    <li class="nav-item">
                        <Link to="/" className={this.getClassName("users")}>Users</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/files/sent" className={this.getClassName("sent")}>Files sent</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/files/received" className={this.getClassName("received")}>Files received</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/" className="btn btn-info" onClick={this.props.logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)