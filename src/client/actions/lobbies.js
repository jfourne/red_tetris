import { GET_LOBBIES } from '../constants/lobbies';

export const getLobbies = (lobbies) => ({
	type: GET_LOBBIES,
	lobbies
})