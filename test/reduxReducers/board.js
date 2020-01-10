import gameReducer from '../../src/client/reducers/board'
import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import { LOAD_BOARD, CLEAR_BOARD } from '../../src/client/constants/actionTypes';
import {configureStore} from '../helpers/server'
import rootReducer from '../../src/client/reducers'
import { loadBoard } from '../../src/client/actions/board';
import { getBoards } from '../../src/client/selectors/board';

chai.should()
chai.use(equalJSX)

describe('Test react board reducer', function(){
	// it('test addNewBoard', function() {
	// 	let myBoard = {
	// 		id: 0,
	// 		board: [0, 0, 0]
	// 	}

	// 	const initialState = {}
	// 	const store =  configureStore(rootReducer, null, initialState, {
	// 	  ALERT_POP: ({dispatch, getState}) =>  {
	// 		const state = getState()
	// 		getBoards(state).should.equal(myBoard)
	// 		done()
	// 	  }
	// 	})
	// 	store.dispatch(loadBoard(myBoard))
	// })

	it('test addNewBoard update', function() {
		let myBoard = {
			id: 0,
			board: [0, 0, 0]
		}
		let myAction = {
			type: LOAD_BOARD,
			board: myBoard
		}
		let newBoard = {
			id: 0,
			board: [1, 0, 0]
		}

		let newState = gameReducer([], myAction);
		newState = gameReducer(newState, {
			type: LOAD_BOARD,
			board: newBoard
		})
		newState[0].should.equal(newBoard)
	})

	it('test clearBoard', function() {
		let myAction = {
			type: CLEAR_BOARD,
		}

		let newState = gameReducer([], myAction);
		newState.length.should.equal(0);
	})

	it('test default', function() {
		let myAction = {
			type: "toto",
		}

		let newState = gameReducer([], myAction);
		newState.length.should.equal(0);
	})
})