import { GET_PLAYERS, REMOVE_PLAYER, ADD_PLAYER } from '../constants/playersInRoom';

const initalState = []

const removePlayer = (state, action) => {
	let playersList = state.map((player) => {
		if (player.playerName !== action.playerName)
			return player
	})

	return playersList;
}

const addPlayer = (state, action) =>{
	let playersList = [...state, action.player]

	return playersList;
}

const playersInRoomReducer = (state = initalState, action) => {
	switch(action.type) {
		case(GET_PLAYERS):
			return action.players
		case(REMOVE_PLAYER):
			return removePlayer(state, action);
		case(ADD_PLAYER):
			return addPlayer(state, action);
		default:
			return state
	}
}

export default playersInRoomReducer;