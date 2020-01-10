import React from 'react'
import HomePageButtonRedux from '../../src/client/containers/HomePageButton'
import { mount, shallow } from 'enzyme';

let initialState = {
	socket: {
		socket: {
			id: 0,
			emit: (action, value) => {}
		}
	},
	roomInfo : {
		roomInfoState: {
			playerName: "test",
			started: true,
		}
	}
};

let ownProps = {
	history: [],
	location: {
		pathname: ""
	}
}

describe('Test HomePageButton', function() {
	let wrapper;

	it('Test HomePageButton in homePage', () => {
		wrapper = mount(
			<HomePageButtonRedux.WrappedComponent
				socket={initialState.socketState}
				roomInfo={initialState.roomInfoState}
				ownProps={{
					history: [],
					location: {
						pathname: "/",
					}
				}}
				clearGame={() => {}}
				clearBoard={() => {}}
			/>
		);
		wrapper.text().should.equal("");
	})

	it('Test HomePageButton without name', () => {
		wrapper = mount(
			<HomePageButtonRedux.WrappedComponent
				socket={initialState.socketState}
				roomInfo={{
					roomInfoState: {}
				}}
				ownProps={ownProps}
				clearGame={() => {}}
				clearBoard={() => {}}
			/>
		);
		wrapper.text().should.equal("HOME");
		let myButton = wrapper.find('button');
		myButton.simulate('click');
	})

	it('Test HomePageButton inside lobby and not confirmed', () => {
		global.confirm = (value) => {
			return false;
		}
		wrapper = mount(
			<HomePageButtonRedux.WrappedComponent
				socket={initialState.socketState}
				roomInfo={initialState.roomInfo}
				ownProps={ownProps}
				clearGame={() => {}}
				clearBoard={() => {}}
			/>
		);
		wrapper.text().should.equal("HOME");
		let myButton = wrapper.find('button');
		myButton.simulate('click');
	})

	it('Test HomePageButton inside game which is started and confirmed', () => {
		global.confirm = (value) => {
			return true;
		}
		wrapper = mount(
			<HomePageButtonRedux.WrappedComponent
				socket={initialState.socket}
				roomInfo={initialState.roomInfo}
				ownProps={ownProps}
				clearGame={() => {}}
				clearBoard={() => {}}
			/>
		);
		wrapper.text().should.equal("HOME");
		let myButton = wrapper.find('button');
		myButton.simulate('click');
	})

	it('Test HomePageButton inside lobby game not started and confirmed', () => {
		global.confirm = (value) => {
			return true;
		}

		initialState.roomInfo.roomInfoState.started = false;
		wrapper = mount(
			<HomePageButtonRedux.WrappedComponent
				socket={initialState.socket}
				roomInfo={initialState.roomInfo}
				ownProps={ownProps}
				clearGame={() => {}}
				clearBoard={() => {}}
			/>
		);
		wrapper.text().should.equal("HOME");
		let myButton = wrapper.find('button');
		myButton.simulate('click');
	})
})