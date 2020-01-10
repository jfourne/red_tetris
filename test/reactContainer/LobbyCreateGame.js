import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import LobbyCreateGameRedux from '../../src/client/containers/Lobbies/LobbyCreateGame'
import { createRenderer } from 'react-test-renderer/shallow';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/client/store';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PLAYER, SPECTATOR } from "../../src/client/constants/playerRole";
import configureStore from 'redux-mock-store';
import { START, SWITCH_ROLE } from "../../src/client/constants/buttonLobby";

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)
const mockStore = configureStore();

let initialState = {
	socket: {
		socket: {
			id: 0,
			emit: (action, value) => {}
		}
	},
	roomInfo: {
		roomInfoState: {
			winner: "test",
			owner: true,
			id: 0,
		}
	},
	playerInfo: {
		name: "test",
		role: PLAYER,
		isOwner: true,
	},
	playersInRoom: [
		"test",
		"toto",
		"titi",
		"tutu",
		"tata",
	],
	spectatorsInRoom: [
		"test2",
	],
	lobbyDeleted: false,
};

let ownProps = {
	history: [],
	location: {
		pathname: "/#0[(Nvvg)test]"
	}
}

describe('Test LobbyCreateGame', function() {
	let wrapper, customStore;
	
	it('Test LobbyCreateGame with all info', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={initialState.roomInfo}
						playerInfo={initialState.playerInfo}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={false}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		let changeOwner = wrapper.find("ul li input")
		// console.log(changeOwner.debug())
		changeOwner.at(1).simulate('click');
	})

	it('Test LobbyCreateGame with all info and lobbyDeleted', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={{
							roomInfoState: {
								owner: "test",
							}
						}}
						playerInfo={initialState.playerInfo}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={true}
						forceQuitLobby={() => {}}
						clearGame={() => {}}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
	})

	it('Test LobbyCreateGame test click START', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={initialState.roomInfo}
						playerInfo={initialState.playerInfo}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={false}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		let buttons = wrapper.find("button");
		buttons.simulate('click');
	})

	it('Test LobbyCreateGame test click SWITCH_ROLE', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={initialState.roomInfo}
						playerInfo={{
							name: "toto",
							role: PLAYER,
							isOwner: false,
						}}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={false}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		let buttons = wrapper.find("button");
		buttons.simulate('click');

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={initialState.roomInfo}
						playerInfo={{
							name: "tyty",
							role: SPECTATOR,
							isOwner: false,
						}}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={false}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
		buttons = wrapper.find("button");
		buttons.simulate('click');
	})

	it('Test LobbyCreateGame without playerInfo', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={{
							roomInfoState: {
								owner: "test",
							}
						}}
						playerInfo={[]}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={true}
						forceQuitLobby={() => {}}
						clearGame={() => {}}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
	})

	it('Test LobbyCreateGame without most of props', () => {
		customStore = mockStore(initialState);

		wrapper = mount(
			<MemoryRouter>
				<Provider store={customStore}>
					<LobbyCreateGameRedux.WrappedComponent
						socket={initialState.socket}
						roomInfo={{
							roomInfoState: {
								owner: true,
								id: -1,
						}}}
						playerInfo={initialState.playerInfo}
						playersInRoom={initialState.playersInRoom}
						spectatorsInRoom={initialState.spectatorsInRoom}
						lobbyDeleted={false}
						forceQuitLobby={() => {}}
						clearGame={() => {}}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
	})
})