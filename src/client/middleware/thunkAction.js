import { createSocket } from '../actions/socket';
import { socketError } from '../actions/socket';
import { loadBoard, clearBoard } from '../actions/board';
import {
	setRoom,
	roomStart,
	roomEnded,
	changeRoomOwner,
	clearGame,
} from '../actions/roomInfo';
import { getPlayers } from '../actions/playersInRoom';
import { getSpectators } from '../actions/spectatorsInRoom';
import { getLobbies } from '../actions/lobbies';
import { changeOwner, switchPlayerRole, setName, clearName } from '../actions/playerInfo';
import { forceQuitLobby } from '../actions/forceQuitLobby';
import { BOARD, INIT_PLAYER, CREATE_LOBBY, GAME_START, GAME_END, GET_LOBBIES, GET_USERS, SET_OWNER, SET_LOBBY_OWNER, SWITCH_ROLE, LOBBY_DELETED, GAME, LOBBY, MY_ERROR } from '../constants/eventHandler';

export const thunkCreateSocket = (socket) => {
	return function(dispatch) {
		socket.on('connect', () => {
			if (socket.connected === true)
				dispatch(createSocket(socket));
		})
		socket.on(INIT_PLAYER, (action) => {
			if (action.type === INIT_PLAYER)
				dispatch(setName(action.name));
		})
		socket.on(GAME, (action) => {
			if (action.type === BOARD) {
				dispatch(loadBoard(action.board));
			} else if (action.type === GAME_START) {
				dispatch(roomStart(true));
			} else if (action.type === GAME_END) {
				dispatch(roomStart(false));
				dispatch(roomEnded(action.winner));
				dispatch(clearBoard());
			}
		})
		socket.on(LOBBY, (action) => {
			if (action.type === CREATE_LOBBY) {
				dispatch(setRoom(action.lobby))
			} else if (action.type === GET_USERS) {
				let players = [];
				let spectators = [];
				action.users.forEach(element => {
					if (element.role === "PLAYER")
					players.push(element);
					else if (element.role === "SPECTATOR")
					spectators.push(element);
				});
				dispatch(getPlayers(players));
				dispatch(getSpectators(spectators));
			} else if (action.type === SET_OWNER) {
				dispatch(changeOwner(action.isOwner));
			} else if (action.type === SET_LOBBY_OWNER) {
				dispatch(changeRoomOwner(action.owner))
			} else if (action.type === SWITCH_ROLE) {
				dispatch(switchPlayerRole());
			} else if (action.type === LOBBY_DELETED) {
				dispatch(forceQuitLobby(true));
			}
		})
		socket.on(GET_LOBBIES, (action) => {
			if (action.type === GET_LOBBIES)
				dispatch(getLobbies(action.lobbies));
		})
		socket.on(MY_ERROR, (action) => {
			if (action.type === MY_ERROR)
				console.log(error);
		})
		socket.on('disconnect', () => {
			dispatch(clearName());
			dispatch(clearBoard());
			dispatch(clearGame());
		})
	}
}