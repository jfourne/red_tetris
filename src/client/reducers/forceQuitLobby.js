import { FORCE_QUIT_LOBBY } from "../constants/forceQuitLobby";

const forceQuitLobbyReducer = (state = false, action) => {
	switch (action.type) {
		case(FORCE_QUIT_LOBBY):
			return action.quit;
		default:
			return state;
	}
}

export default forceQuitLobbyReducer;