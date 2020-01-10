import { FORCE_QUIT_LOBBY } from "../constants/forceQuitLobby";

export const forceQuitLobby = (quit) => ({
	type: FORCE_QUIT_LOBBY,
	quit,
})