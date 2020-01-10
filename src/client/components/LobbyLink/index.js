import React from 'react'

const LobbyLink = (props) => {
	let ongoing;
	if (props.ongoing === 2)
		ongoing = "Ongoing";
	else
		ongoing = "Pending";

	return (
		<div className="lobbyLinkRow">
			<div className="lobbylinkId">
				<p>{props.id}</p>
			</div>
			<div className="lobbyLinkHost">
				<p>{props.playerName}</p>
			</div>
			<div className="lobbyLinkStatus">
				<p>{ongoing}</p>
			</div>
			<div className="lobbyLinkNbPlayer">
				<p>{props.nbPlayer} / 5</p>
			</div>
			<div className="lobbyLinkJoin">
				<button
					className="enterLobbyRoom"
					type="button"
					onClick={() => props.handleClick(props.id, props.playerName)}
				>
					ENTER
				</button>
			</div>
		</div>
	)
}

export default LobbyLink;