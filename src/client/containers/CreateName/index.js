import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setName } from '../../actions/playerInfo';
import './createName.css';
import { getSocket } from '../../selectors/socket';
import { ACTION_INIT, ACTION_MAIN_LOBBY } from '../../constants/eventHandler';
import { servInitPLayer, servJoinLobby } from '../../actions/server';


export const CreateName = ({socket, ownProps, submitName}) => {
	let name = ""

	const handleChange = (e) => {
		name = e.target.value;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === "")
			alert("Name can't be empty");
		else {
			socket.socket.emit(ACTION_INIT, servInitPLayer(name.slice()));
			if (ownProps.sendName === true) {
				socket.socket.emit(ACTION_MAIN_LOBBY,
					servJoinLobby(ownProps.roomId, ownProps.roomName))
			}
		}
	}

	return (
		<div className="createName">
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="labelDiv">
					<label htmlFor="name" >
						Enter your name :
					</label>
				</div>
				<div className="nameDiv">
					<input id="name" onChange={(e) => handleChange(e)}/>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	socket: getSocket(state),
	ownProps: ownProps,
})

export default withRouter(connect(
	mapStateToProps,
)(CreateName));