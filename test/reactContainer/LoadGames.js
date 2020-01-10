import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import LoadGamesRedux from '../../src/client/containers/Lobbies/LoadGames'
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
	lobbies: [
		{
			id: 0,
			name: "test",
			ongoing: true,
			nbPlayer: 4,
		}
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

describe('Test LoadGames', function() {
	let wrapper;
	
	it('Test LoadGames with lobbies', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<LoadGamesRedux.WrappedComponent
						lobbies={initialState.lobbies}
						socket={initialState.socket}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		let buttonLobby = wrapper.find("LobbyLink")
		buttonLobby.find('button').simulate('click');
	})
})