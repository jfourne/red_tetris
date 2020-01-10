import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import { ButtonStart } from '../../src/client/containers/ButtonStart'
import ButtonStartRedux from '../../src/client/containers/ButtonStart'
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

import configureStore from 'redux-mock-store';
import { QUICK_START, MULTIPLAYER } from "../../src/client/constants/buttonStartName";

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)

let initialState = {
	socketState: {
		socket: {
			id: 0,
			emit: (action, value) => {}
		}
	}
};

let ownProps = {
	history: [],
	buttonName: QUICK_START,
}

describe('Test ButtonStart', function() {
	let wrapper;

	it('Test click ButtonStart QUICK START', () => {
		wrapper = mount(
			<ButtonStartRedux.WrappedComponent
				socketState={initialState.socketState}
				currButtonName={QUICK_START}
				history={[]}
			/>
		);
		let myButton = wrapper.find('button')
		myButton.simulate('click');
	})

	it('Test click ButtonStart MULTIPLAYER', () => {
		wrapper = mount(
			<ButtonStartRedux.WrappedComponent
				socketState={initialState.socketState}
				currButtonName={MULTIPLAYER}
				history={[]}
			/>
		);
		let myButton = wrapper.find('button')
		myButton.simulate('click');
	})

	it('Test click ButtonStart NONE', () => {
		wrapper = mount(
			<ButtonStartRedux.WrappedComponent
				socketState={initialState.socketState}
				currButtonName={"none"}
				history={[]}
			/>
		);
		let myButton = wrapper.find('button')
		myButton.simulate('click');
	})
})