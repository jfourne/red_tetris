import {
	SET_NAME,
	SWITCH_ROLE,
	CHANGE_OWNER,
	CLEAR_NAME,
} from '../constants/playerInfo';

export const setName = (name) => ({
	type: SET_NAME,
	name
})

export const switchPlayerRole = () => ({
	type: SWITCH_ROLE,
})

export const changeOwner = (isOwner) => ({
	type: CHANGE_OWNER,
	isOwner
})

export const clearName = () => ({
	type: CLEAR_NAME,
})