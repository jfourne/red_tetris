import {
	SERV_INIT_PLAYER,
	SERV_CREATE_LOBBY,
	SERV_JOIN_LOBBY,
	SERV_GET_LOBBIES,
	SERV_LEAVE_LOBBY,
	SERV_SWITCH_ROLE,
	SERV_SET_OWNER,
	SERV_GET_USERS,
	SERV_GAME_START,
	LEFT_ARROW,
	SPACE,
	RIGHT_ARROW,
	UP_ARROW,
	DOWN_ARROW,
} from '../constants/eventHandler';

export const ping = () => ({
    type: 'server/ping'
})

export const servInitPLayer = (name) => ({
	type: SERV_INIT_PLAYER,
	name,
})

export const servCreateLobby= () => ({
	type: SERV_CREATE_LOBBY,
})

export const servJoinLobby = (roomId, roomName) => ({
	type: SERV_JOIN_LOBBY,
	roomId,
	roomName,
})

export const servGetLobbies = () => ({
	type: SERV_GET_LOBBIES,
})

export const servLeaveLobby = () => ({
	type: SERV_LEAVE_LOBBY,
})

export const servSwitchRole = (name, role) => ({
	type: SERV_SWITCH_ROLE,
	name,
	role,
})

export const servSetOwner = (name) => ({
	type: SERV_SET_OWNER,
	name,
})

export const servGetUsers = () => ({
	type: SERV_GET_USERS,
})

export const servGameStart = (id) => ({
	type: SERV_GAME_START,
	id,
})

export const leftArrow = () => ({
	type: LEFT_ARROW,
})

export const rightArrow = () => ({
	type: RIGHT_ARROW,
})

export const upArrow = () => ({
	type: UP_ARROW,
})

export const downArrow = () => ({
	type: DOWN_ARROW,
})

export const space = () => ({
	type: SPACE,
})