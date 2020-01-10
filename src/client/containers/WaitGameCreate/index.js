import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRoomInfo } from '../../selectors/roomInfo';

const WaitGameCreate = ({roomInfo, ownProps}) => {
	let currRoom = "";

	// GERER ERROR GAME START
	if (roomInfo.roomInfoState && roomInfo.roomInfoState.playerName) {
		currRoom = '/' + roomInfo.roomInfoState.id
		+ '[' + roomInfo.roomInfoState.playerName + ']';

		ownProps.history.push(currRoom);
	}

	return (
		<div>
			<p>Loading...</p>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	roomInfo: getRoomInfo(state),
	ownProps: ownProps,
})

export default withRouter(connect(
	mapStateToProps,
)(WaitGameCreate))