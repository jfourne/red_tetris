import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import WaitGameCreateRedux from '../../src/client/containers/WaitGameCreate'
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
	roomInfo: {
		roomInfoState: {
			winner: "test",
			playerName: "test",
			owner: true,
			id: 0,
		}
	},
};

let ownProps = {
	history: [],
}

describe('Test WaitGameCreate', function() {
	let wrapper;

	it('Test WaitGameCreate', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<WaitGameCreateRedux.WrappedComponent
						roomInfo={initialState.roomInfo}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
	})

	it('Test WaitGameCreate without playerName', () => {
		wrapper = mount(
			<MemoryRouter>
				<Provider store={store}>
					<WaitGameCreateRedux.WrappedComponent
						roomInfo={{
							roomInfoState: {
								winner: "test",
								owner: true,
								id: 0,
						}}}
						ownProps={ownProps}
					/>
				</Provider>
			</MemoryRouter>
		);
	})
})