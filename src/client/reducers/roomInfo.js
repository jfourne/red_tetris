import {
	SET_ROOM,
	ROOM_START,
	GAME_END,
	CLEAR_GAME,
	CHANGE_ROOM_OWNER,
} from '../constants/roomInfo';

const setRoom = (state = [], action) => {
	let newRoom = Object.assign({}, action.room);

	newRoom.started = false;
	newRoom.winner = "";
	return newRoom;
}

const startRoom = (state, action) => {
	let updateRoom = {...state};

	updateRoom.started = action.started;
	return updateRoom;
}

const gameEnd = (state, action) => {
	let updateRoom = {...state};

	updateRoom.winner = action.winner;
	return updateRoom;
}

const resetGame = () => {
	let reset = {};

	return reset;
}

const changeOwner = (state, action) => {
	let updateRoom = {...state};

	updateRoom.owner = action.owner;
	return updateRoom;
}

const roomInfoReducer = (state = [], action) => {
	switch(action.type) {
		case(SET_ROOM):
			return setRoom(state, action);
		case(ROOM_START):
			return startRoom(state, action);
		case(GAME_END):
			return gameEnd(state, action);
		case(CHANGE_ROOM_OWNER):
			return changeOwner(state, action);
		case (CLEAR_GAME):
			return resetGame();
		default:
			return state;
	}
}

export default roomInfoReducer;