import React from 'react';
import { withRouter, Prompt } from 'react-router-dom'
import EventListener from "react-event-listener";
import Board from '../../components/Board';
import { getBoards } from '../../selectors/board';
import { connect } from 'react-redux';
import { getSocket } from '../../selectors/socket';
import * as key from '../../constants/keyPress';
import { ACTION_GAME } from '../../constants/eventHandler';
import { leftArrow, rightArrow, upArrow, downArrow, space } from '../../actions/server';

export const AllBoards = ({allBoards, socket, playerInfo, ownProps}) => {
	let i = 1;
	let preventNav = false;
	if (!socket || socket.length === 0) {
		if (ownProps && ownProps.history)
			ownProps.history.push('/');
	}

	const handleKeyDown = (e) => {
		switch(e.keyCode) {
			case key.LEFT_ARROW: {
				console.log("left arrow");
				socket.socket.emit(ACTION_GAME, leftArrow());
				break ;
			}
			case key.RIGHT_ARROW: {
				console.log("right arrow");
				socket.socket.emit(ACTION_GAME, rightArrow());
				break ;
			}
			case key.UP_ARROW: {
				console.log("up arrow");
				socket.socket.emit(ACTION_GAME, upArrow());
				break ;
			}
			case key.DOWN_ARROW: {
				console.log("down arrow");
				socket.socket.emit(ACTION_GAME, downArrow());
				break ;
			}
			case key.SPACE: {
				console.log("space");
				socket.socket.emit(ACTION_GAME, space());
				break ;
			}
			default:
				break;
		}
	}

	// const handleClickMain = (boardId) => {
	// 	if (playerInfo.role === SPECTATOR)
	// 		socket.socket.emit("server/changeMainBoard", boardId);
	// }

	return (
		<div className="allBoard">
			<EventListener target={document} onKeyDown={(e) => handleKeyDown(e)} />
			<Prompt when={preventNav} message="Do you really want to leave this game ?"/>
			{allBoards && allBoards.map((boards) =>
				<Board
					key={boards.id}
					id={boards.id}
					board={boards.board}
					mainBoard={boards.main}
					otherId={!boards.main && i++}
					// handleClickMain={handleClickMain}
				/>
			)}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	allBoards: getBoards(state),
	socket: getSocket(state),
	ownProps: ownProps,
})

export default withRouter(connect(
	mapStateToProps,
)(AllBoards));