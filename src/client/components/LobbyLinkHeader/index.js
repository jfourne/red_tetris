import React from 'react';
import './lobbyLinkHeader.css';

const LobbyLinkHeader = () => {
	return (
		<div className="lobbyLinkRow">
			<div className="lobbylinkId">
				<p>#</p>
			</div>
			<div className="lobbyLinkHost">
				<p>HOST</p>
			</div>
			<div className="lobbyLinkStatus">
				<p>STATUS</p>
			</div>
			<div className="lobbyLinkNbPlayer">
				<p>PLAYERS</p>
			</div>
			<div className="lobbyLinkJoin">
				<p>JOIN</p>
			</div>
		</div>
	)
}

export default LobbyLinkHeader;