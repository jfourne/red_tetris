import {
	SET_NAME,
	SWITCH_ROLE,
	CHANGE_OWNER,
	CLEAR_NAME,
} from '../constants/playerInfo';

import { PLAYER, SPECTATOR } from '../constants/playerRole'

const createPlayer = (state, action) => {
	let player = {};

	player.name = action.name;
	player.role = PLAYER;
	player.isOwner = false;
	return player;
}

const changePlayerRole = (state, action) => {
	let player = Object.assign({}, {...state});

	if (player.role === PLAYER)
		player.role = SPECTATOR
	else if (player.role === SPECTATOR)
		player.role = PLAYER;
	return player;
}

const setOwner = (state, action) => {
	let changedOwner = Object.assign({}, {...state});

	changedOwner.isOwner = action.isOwner;
	return changedOwner;
}

const playerInfoReducer = (state = [], action) => {
	switch(action.type) {
		case(SET_NAME):
			return createPlayer(state, action);
		case(SWITCH_ROLE):
			return changePlayerRole(state, action)
		case(CHANGE_OWNER):
			return setOwner(state, action);
		case(CLEAR_NAME):
			return [];
		default:
			return state
	}
}

export default playerInfoReducer;