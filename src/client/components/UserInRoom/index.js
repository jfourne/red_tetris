import React from 'react';
import './userInRoom.css';

const UserInRoom = (props) => {
	let printNbUser;

	if (props.title === "PLAYERS") {
		printNbUser = props.nbUser + " / 5"
	} else {
		printNbUser = props.nbUser
	}

	return (
		<div className="userInRoom">
			<h3 className="userInRoomTitle">
				{props.title}
			</h3>
			<p className="printNbUser">{printNbUser}</p>
			<ul>
				{props.users && props.users.map((user, index) => 
					index < 10 &&
					<li key={index}
						id={props.title === "PLAYERS"
							? "playerList"
							: "spectatorList"}
					>
						{props.title === "PLAYERS"
						&& props.isOwner
						&& props.owner !== user.playerName
						? <input
								id="changeOwnerButton"
								type="button"
								value="👑"
								onClick={() => props.handleClickChangeOwner(user.playerName)}
							/>
						: <p id="changeOwnerBlank"></p>}
						{user.playerName}
						{props.owner === user.playerName 
						&& "  👑"}
						{user.playerName === props.playerName
						&& "  👤"}
						{props.winner && user.playerName === props.winner
						&& "  😎"}
					</li>
				)}
			</ul>
		</div>
	)
}

export default UserInRoom;