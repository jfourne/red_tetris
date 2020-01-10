import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import { AllBoards } from '../../src/client/containers/AllBoards';
import AllBoardsRedux from '../../src/client/containers/AllBoards';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as key from '../../src/client/constants/keyPress';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import '../helpers/setupDom';

import configureStore from 'redux-mock-store';

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)

let initialState = {
	boardState: [
		{
			id: 0,
			board: [],
			main: true,
		},
		{
			id: 1,
			board: [],
			main: false,
		},
		{
			id: 2,
			board: [],
			main: false,
		}
	],
	socketState: {
		id: 0,
		socket: {
			emit: (action, value) => {
			}
		}
	},
	ownProps: {
		history: [
			"test",
		]
	}
};

describe('Test AllBoards', function() {
	let wrapper;

	it('Test AllBoards Component', () => {
		wrapper = shallow(
			<AllBoardsRedux.WrappedComponent
				ownProps={initialState.ownProps}
			/>
		);
		wrapper.text().should.equal("<EventListener /><Prompt />");
	})

	it('Test simulate keyPress', () => {
		wrapper = mount(
			<MemoryRouter>
				<AllBoardsRedux.WrappedComponent
					allBoards={initialState.boardState}
					socket={initialState.socketState}
				/>
			</MemoryRouter>
		);
		var keyLeft = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : key.LEFT_ARROW,
		});
		var keyRight = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : key.RIGHT_ARROW,
		});
		var keyUp = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : key.UP_ARROW,
		});
		var keyDown = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : key.DOWN_ARROW,
		});
		var keySpace = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : key.SPACE,
		});
		var keyNone = new KeyboardEvent("keydown", {
			bubbles : true,
			keyCode : 5,
		});
		document.dispatchEvent(keyLeft)
		document.dispatchEvent(keyRight)
		document.dispatchEvent(keyUp)
		document.dispatchEvent(keyDown)
		document.dispatchEvent(keySpace)
		document.dispatchEvent(keyNone)
	})
})