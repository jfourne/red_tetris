import { GET_SPECTATORS, ADD_SPECTATOR, REMOVE_SPECTATOR } from '../constants/spectatorsInRoom';

export const getSpectators = (spectators) => ({
	type: GET_SPECTATORS,
	spectators,
})

export const addSpectator = (spectator) => ({
	type: ADD_SPECTATOR,
	spectator,
})

export const removeSpectator = (spectatorName) => ({
	type: REMOVE_SPECTATOR,
	spectatorName,
})