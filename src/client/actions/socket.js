import { CREATE_SOCKET } from '../constants/socket';
import { SOCKET_ERROR } from '../constants/socket';

export const createSocket = (socket) => ({
	type: CREATE_SOCKET,
	socket,
})

export const socketError = (error) => ({
	type: SOCKET_ERROR,
	error,
})