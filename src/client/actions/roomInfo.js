import {
	SET_ROOM,
	ROOM_START,
	GAME_END,
	CLEAR_GAME,
	CHANGE_ROOM_OWNER,
} from "../constants/roomInfo"

export const setRoom = (room) => ({
	type: SET_ROOM,
	room,
})

export const roomStart = (started) => ({
	type: ROOM_START,
	started,
})

export const roomEnded = (winner) => ({
	type: GAME_END,
	winner,
})

export const clearGame = () => ({
	type: CLEAR_GAME,
})

export const changeRoomOwner = (owner) => ({
	type: CHANGE_ROOM_OWNER,
	owner,
})