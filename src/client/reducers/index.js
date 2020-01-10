import { combineReducers } from 'redux';
import alert from './alert'
import board from './board'
import socket from './socket'
import playerInfo from './playerInfo';
import roomInfo from './roomInfo';
import playersInRoom from './playersInRoom';
import spectatorsInRoom from './spectatorsInRoom';
import forceQuitLobby from './forceQuitLobby';
import { routerReducer } from 'react-router-redux'
import lobbies from './lobbies';

const rootReducer = combineReducers({
	alertState: alert,
	boardState: board,
	socketState: socket,
	playerInfoState: playerInfo,
	roomInfoState: roomInfo,
	playersInRoomState: playersInRoom,
	spectatorsInRoomState: spectatorsInRoom,
	lobbiesState: lobbies,
	forceQuitLobbyState: forceQuitLobby,
	routing: routerReducer,
})

export default rootReducer;