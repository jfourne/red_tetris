import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import { App } from '../../src/client/containers/app';
import AppRedux from '../../src/client/containers/app';
import CreateName from '../../src/client/containers/CreateName';
import { PLAYER } from "../../src/client/constants/playerRole";
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';

enzyme.configure({ adapter: new Adapter() });
chai.should()
chai.use(equalJSX)

const mockStore = configureStore();

describe('Test App', function() {
	let wrapper, customStore;

	it('test app without playerInfoState', function() {
		const initialState = {
			playerInfoState : {
				playerName: "test",
				role: PLAYER,
				isOwner: false,
			},
		}
		customStore = mockStore(initialState);
		wrapper = shallow(
			<AppRedux.WrappedComponent store={customStore}/>
		);
		wrapper.text().should.equal("<withRouter(Connect(CreateName)) />"
		)
	})

	it('test app with playerInfoState', function() {
		let playerInfoState = {
			playerName: "test",
			role: PLAYER,
			isOwner: false,
		}
		const renderer = createRenderer()
		renderer.render(React.createElement(App, {playerInfoState: playerInfoState}))
		const output = renderer.getRenderOutput()
		output.should.not.equalJSX(
		<div className="gamePage">
			<CreateName sendName={false} roomId={-1} roomName={undefined}/>
		</div>
		)
	})
})