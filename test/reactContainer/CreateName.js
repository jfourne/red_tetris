import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import { CreateName } from '../../src/client/containers/CreateName'
import CreateNameRedux from '../../src/client/containers/CreateName'
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)

global.alert = (value) => {};

let initialState = {
	socketState: {
		socket: {
			id: 0,
			emit: (action, value) => {}
		}
	}
};

let ownProps = {
	sendName: true
}

describe('Test CreateName', function() {
	let wrapper;

	it('Test CreateName submit with name', () => {
		wrapper = mount(
			<CreateNameRedux.WrappedComponent
				socket={initialState.socketState}
				ownProps={ownProps}
			/>
		);
		let myForm = wrapper.find('form')
		let myInput = myForm.find('input');
		myInput.simulate('change', {target: {name: 'name', value: 'value'}})
		myForm.simulate('submit');
	})

	it('Test CreateName submit with name without sendName', () => {
		wrapper = mount(
			<CreateNameRedux.WrappedComponent
				socket={initialState.socketState}
				ownProps={{
					sendName: false,
				}}
			/>
		);
		let myForm = wrapper.find('form')
		let myInput = myForm.find('input');
		myInput.simulate('change', {target: {name: 'name', value: 'value'}})
		myForm.simulate('submit');
	})

	it('Test CreateName submit without name', () => {
		wrapper = mount(
			<CreateNameRedux.WrappedComponent
				socket={initialState.socketState}
				ownProps={ownProps}
			/>
		);
		let myForm = wrapper.find('form')
		myForm.simulate('submit');
	})
})