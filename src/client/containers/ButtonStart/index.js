import React from 'react';
import './buttonStart.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as buttonName from '../../constants/buttonStartName';
import { getSocket } from '../../selectors/socket';
import { ACTION_MAIN_LOBBY, ACTION_LOBBY } from '../../constants/eventHandler';
import { servCreateLobby, servGetUsers, servGetLobbies } from '../../actions/server';

export const ButtonStart = ({socketState, currButtonName, history}) => {
	const handleClick = () => {
		if (currButtonName == buttonName.QUICK_START) {
			socketState.socket.emit(ACTION_MAIN_LOBBY, servCreateLobby());
			socketState.socket.emit(ACTION_LOBBY, servGetUsers());
			history.push('/loadGamePage')
		} else if (currButtonName === buttonName.MULTIPLAYER) {
			socketState.socket.emit(ACTION_MAIN_LOBBY, servGetLobbies());
			history.push('/lobbies/multiplayer');
		}
	}

	return (
		<div>
			<button onClick={() => handleClick()}>
				{currButtonName}
			</button>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	socketState: getSocket(state),
	currButtonName: ownProps.buttonName,
	history: ownProps.history,
})

export default withRouter(connect(
	mapStateToProps,
)(ButtonStart));