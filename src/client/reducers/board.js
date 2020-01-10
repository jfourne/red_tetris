import {
	LOAD_BOARD,
	CLEAR_BOARD,
} from '../constants/actionTypes';

const addNewBoard = (state, action) => {
	let added = false;
	let newBoards = state.map((board) => {
		if (board && board.id !== action.board.id) {
			return board
		} else {
			added = true;
			return action.board
		}
	})

	if (added === false) {
		newBoards = [...state, action.board];
	}
	return newBoards;
}

const gameReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_BOARD:
			return addNewBoard(state, action);
		case CLEAR_BOARD:
			return [];
		default:
			return state;
	}
}

export default gameReducer;