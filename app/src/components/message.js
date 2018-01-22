import React from 'react'

export const Message = (props) => {
	return (  
			<div className={props.msg.to == props.user_id ? "friendsMessage" : "myMessage"}>
				{props.msg.text}
			</div>
	)

}