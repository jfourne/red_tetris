import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRoomInfo } from '../../selectors/roomInfo';
import LobbyCreateGame from '../Lobbies/LobbyCreateGame';
import AllBoards from '../AllBoards';
import { getPlayerInfo } from '../../selectors/playerInfo';

export const LoadGamePage = ({roomInfo, playerInfo}) => {
	return (
		<div>
			{ (roomInfo.roomInfoState && roomInfo.roomInfoState.started)
				|| playerInfo.type === "spectator"
			? <AllBoards />
			: <LobbyCreateGame />
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	roomInfo: getRoomInfo(state),
	playerInfo: getPlayerInfo(state),
})

export default withRouter(connect(
	mapStateToProps,
)(LoadGamePage))