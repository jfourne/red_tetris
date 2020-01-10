import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './loadGames.css';
import { getLobbies } from '../../../selectors/lobbies';
import { getPlayerInfo } from '../../../selectors/playerInfo';
import { ACTION_MAIN_LOBBY } from '../../../constants/eventHandler';
import LobbyLinkHeader from '../../../components/LobbyLinkHeader';
import LobbyLink from '../../../components/LobbyLink';
import { getSocket } from '../../../selectors/socket';
import { servJoinLobby } from '../../../actions/server';

const LoadGames = ({lobbies, socket, ownProps}) => {

	const handleClick = (id, playerName) => {
		let lobbyAddr = "/" + id
			+ '[' + playerName + ']';
		socket.socket.emit(ACTION_MAIN_LOBBY,
			servJoinLobby(id, playerName))
		ownProps.history.push(lobbyAddr);
	}

	return (
		<React.Fragment>
			<div>
				<h3 className="lobbyTitle">Lobbies</h3>
			</div>
			<div className="lobbiesPrint">
				{ lobbies.length === 0
				? <p>No game found</p>
				: <React.Fragment>
				<LobbyLinkHeader />
				{lobbies.map((lobby, index) => 
					index < 6 &&
					<LobbyLink
						key={lobby.id}
						id={lobby.id}
						playerName={lobby.name}
						ongoing={lobby.ongoing}
						nbPlayer={lobby.nbPlayer}
						handleClick={handleClick}
					/>
				)}
				</React.Fragment>
				}
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = (state, ownProps) => ({
	playerInfo: getPlayerInfo(state),
	lobbies: getLobbies(state),
	socket: getSocket(state),
	ownProps: ownProps,
})

export default withRouter(connect(
	mapStateToProps,
)(LoadGames));