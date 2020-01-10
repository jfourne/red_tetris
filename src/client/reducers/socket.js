import { CREATE_SOCKET } from '../constants/socket';

const createSocketServer = (state, action) => {
	return { socket: action.socket };
}

const socketReducer = (state = [], action) => {
	switch(action.type) {
		case(CREATE_SOCKET):
			return createSocketServer(state, action);
		default:
			return state;
	}
}

export default socketReducer;