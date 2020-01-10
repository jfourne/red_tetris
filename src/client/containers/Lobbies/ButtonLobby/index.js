import React from 'react';

const ButtonLobby = (props) => {
	return (
		<div>
			<button
				id={props.buttonName}
				className="buttonLobby"
				onClick={() => props.handleClick()}>
				{props.buttonName}
			</button>
		</div>
	)
}

export default ButtonLobby;