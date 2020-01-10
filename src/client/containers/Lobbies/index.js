import React from 'react';
import { NEW_GAME, RELOAD } from '../../constants/buttonLobby';
import { ACTION_MAIN_LOBBY, ACTION_LOBBY } from '../../constants/eventHandler';
import LoadGames from './LoadGames';
import ButtonLobby from './ButtonLobby';
import { getSocket } from '../../selectors/socket';
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { getPlayerInfo } from '../../selectors/playerInfo';
import { servGetUsers, servGetLobbies, servCreateLobby } from '../../actions/server';

const Lobbies = ({socketState, playerInfo, ownProps}) => {
	if (playerInfo.length === 0)
		ownProps.history.push('/');

	const handleClickNewGame = () => {
		socketState.socket.emit(ACTION_MAIN_LOBBY, servCreateLobby());
		socketState.socket.emit(ACTION_LOBBY, servGetUsers());
		ownProps.history.push('/lobbies/multiplayer/loadGamePage');
	}

	const handleClickReload = () => {
		socketState.socket.emit(ACTION_MAIN_LOBBY, servGetLobbies());
	}

	return (
		<div className="loadGames">
			<LoadGames />
			<button id="reload" onClick={() => handleClickReload()}>
				{RELOAD}
			</button>
				{ ownProps.match.params.gameMode === "multiplayer"
				&& <ButtonLobby
				buttonName={NEW_GAME}
				handleClick={handleClickNewGame}/>
			}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	socketState: getSocket(state),
	playerInfo: getPlayerInfo(state),
	ownProps: ownProps,
})

export default withRouter(connect(
	mapStateToProps,
)(Lobbies));