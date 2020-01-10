import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER } from '../constants/playersInRoom';

export const getPlayers = (players) => ({
	type: GET_PLAYERS,
	players,
})

export const addPlayer = (player) => ({
	type: ADD_PLAYER,
	player
})

export const removePlayer = (playerName) => ({
	type: REMOVE_PLAYER,
	playerName,
})