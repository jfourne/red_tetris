import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import { LoadGamePage } from '../../src/client/containers/LoadGamePage'
import AllBoards from '../../src/client/containers/AllBoards'
import LobbyCreateGame from '../../src/client/containers/Lobbies/LobbyCreateGame';

let initialState = {
	playerInfo: {
		type: "spectator"
	},
	roomInfo : {
		roomInfoState: {
			playerName: "test",
			started: true,
		}
	}
};

describe('Test LoadGamePageRedux', function() {
	it('Test LoadGamePage for allBoards', () => {
		const renderer = createRenderer()
		renderer.render(React.createElement(LoadGamePage, {roomInfo: initialState.roomInfo, playerInfo: initialState.playerInfo}))
		const output = renderer.getRenderOutput()
		output.should.equalJSX(
			<div>
				<AllBoards />
			</div>
		)
	})

	it('Test LoadGamePage for lobbyCreateGane', () => {
		const renderer = createRenderer()
		renderer.render(React.createElement(LoadGamePage, {roomInfo: {}, playerInfo: {}}))
		const output = renderer.getRenderOutput()
		output.should.equalJSX(
			<div>
				<LobbyCreateGame />
			</div>
		)
	})
})