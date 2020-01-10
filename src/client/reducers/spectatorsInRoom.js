import {
	GET_SPECTATORS,
	REMOVE_SPECTATOR,
	ADD_SPECTATOR,
} from '../constants/spectatorsInRoom'

const removeSpectator = (state, action) => {
	let spectatorsList = state.map((spectator) => {
		if (spectator.playerName !== action.spectatorName)
			return spectator
	})

	return spectatorsList;
}

const addSpectator = (state, action) =>{
	let spectatorsList = [...state, action.spectator]

	return spectatorsList;
}

const spectatorsInRoomReducer = (state = [], action) => {
	switch(action.type) {
		case(GET_SPECTATORS):
			return action.spectators
		case(REMOVE_SPECTATOR):
			return removeSpectator(state, action);
		case(ADD_SPECTATOR):
			return addSpectator(state, action);
		default:
			return state
	}
}

export default spectatorsInRoomReducer;