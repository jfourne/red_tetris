import { GET_LOBBIES } from '../constants/lobbies';

let initalState = []

const lobbiesReducer = (state = initalState, action) => {
	switch(action.type) {
		case(GET_LOBBIES):
			return action.lobbies;
		default:
			return state
	}
}

export default lobbiesReducer;