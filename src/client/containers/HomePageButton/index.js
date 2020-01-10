import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './homePageButton.css';
import { clearGame } from '../../actions/roomInfo';
import { getSocket } from '../../selectors/socket';
import { getRoomInfo } from '../../selectors/roomInfo';
import { clearBoard } from '../../actions/board';
import { ACTION_LEAVE_LOBBY } from '../../constants/eventHandler';
import { servLeaveLobby } from '../../actions/server';

export const HomePageButton = ({socket, roomInfo, ownProps, clearGame, clearBoard}) => {
	const handleClick = () => {
		if (roomInfo.roomInfoState && roomInfo.roomInfoState.playerName) {
			if (confirm("Do you really want to leave this game ?")) {
				socket.socket.emit(ACTION_LEAVE_LOBBY, servLeaveLobby(roomInfo.roomInfoState.id));
				clearGame();
				if (roomInfo.roomInfoState.started)
					clearBoard();
				ownProps.history.push('/');
			}
		}
		else
			ownProps.history.push('/');
	}

	return (
		<div className="homePageButtonDiv">
			{ownProps.location.pathname !== "/"
			&& <button className="homePageButton" onClick={() => handleClick()}>HOME</button>
			}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	socket: getSocket(state),
	roomInfo: getRoomInfo(state),
	ownProps: ownProps,
})

const mapDispatchToProps = (dispatch) => ({
	clearGame: () => dispatch(clearGame()),
	clearBoard: () => dispatch(clearBoard()),
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomePageButton));