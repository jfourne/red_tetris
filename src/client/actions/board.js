import {
	LOAD_BOARD,
	CLEAR_BOARD,
} from '../constants/actionTypes';

export const loadBoard = (board) => ({
	type: LOAD_BOARD,
	board,
})

export const clearBoard = () => ({
	type: CLEAR_BOARD,
})