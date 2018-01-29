import React from 'react'
import { Link } from 'react-router'
export const UsersList = (props) => {
	return (  <div className="row">
                    <div className="col">
                       <ul id="usersList">
                {props.users.map((user) => {
                    return (
                        <li key={user._id}><Link to={"/messages/"+user._id}>{user.login}</Link> { props.online.indexOf(user._id) > -1 ? <span className='online'>online</span> : <span className='offline'>offline</span>}</li>
                    )
                })}
                        </ul>
                    </div>
                </div>)

}