import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import LobbiesRedux from '../../src/client/containers/Lobbies'
import { createRenderer } from 'react-test-renderer/shallow';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/client/store';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)

let initialState = {
	socket: {
		socket: {
			id: 0,
			emit: (action, value) => {}
		}
	},
	playerInfo: [
		"test"
	]
};

let ownProps = {
	history: [],
	match: {
		params: {
			gameMode: "multiplayer"
		}
	}
}

describe('Test Lobbies', function() {
	let wrapper;
	
	it('Test Lobbies without playerInfo', () => {
		wrapper = shallow(
			<LobbiesRedux.WrappedComponent
			socketState={initialState.socket}
			playerInfo={[]}
			ownProps={ownProps}
			/>
			);
		ownProps.history[0].should.equal("/");
		initialState.history = [];
	})

	it('Test Lobbies without params.gameMode', () => {
		wrapper = shallow(
			<LobbiesRedux.WrappedComponent
				socketState={initialState.socket}
				playerInfo={initialState.playerInfo}
				ownProps={{
					history: [],
					match: {
						params: {}
					}
				}}
			/>
		);
		wrapper.find('#reload').simulate('click')
	})

	it('Test Lobbies with params.gameMode multiplayer', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<LobbiesRedux.WrappedComponent
						socketState={initialState.socket}
						playerInfo={initialState.playerInfo}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		let buttonLobby = wrapper.find("ButtonLobby")
		buttonLobby.find('button').simulate('click');
	})
})