import React from 'react'

export const UsersList = (props) => {
	return (  <ul>
                {props.users.map((user) => {
                    return (
                        <li key={user._id}><Link to={"messages/"+user._id}>{user.login}</Link> { props.online.indexOf(user._id) > -1 ? "online" : "offline"}</li>
                    )
                })}
                </ul>)

}