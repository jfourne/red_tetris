import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import MyBoard from '../../src/client/components/Board';
import GameTitle from "../../src/client/components/GameTitle";
import LobbyLinkHeader from "../../src/client/components/LobbyLinkHeader";
import LobbyLink from "../../src/client/components/LobbyLink";
import Piece from "../../src/client/components/Piece";
import PrintCurrRoom from "../../src/client/components/PrintCurrRoom";
import PrintWinnerLooser from "../../src/client/components/PrintWinnerLooser";
import { PLAYER } from "../../src/client/constants/playerRole";
import UserInRoom from "../../src/client/components/UserInRoom";

chai.should()
chai.use(equalJSX)

describe('Test react Board, gameTitle, PruntCurrRoom', function(){
	it('test component Board with mainBoard', function() {
		const renderer = createRenderer()
		renderer.render(React.createElement(MyBoard, {mainBoard: true}));
		const output = renderer.getRenderOutput();
		output.props.className.should.equal("flex-row-item mainBoard");
	})

	it('test component Board without mainBoard', function() {
		const renderer = createRenderer()
		renderer.render(React.createElement(MyBoard, {mainBoard: false, otherId: 1}));
		const output = renderer.getRenderOutput();
		output.props.className.should.equal("flex-row-item otherBoard1");
	})

	it('test gameTitle', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(GameTitle));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div>
			<h1 className="gameTitle">Red Tetris</h1>
		</div>
		);
	})

	it('test PrintCurrRoom', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(PrintCurrRoom));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div>
			<div className="labelDiv">
				<label htmlFor="printCurrRoom">
					Current room address :
				</label>
			</div>
			<input
				type="test"
				value={undefined}
				id="printCurrRoom"
				readOnly
			/>
		</div>

		)
	})
})

const handleClick = (id, playerName) => {
}

describe('Test lobby link and header', function() {
	it('test lobbyLinkHeader', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(LobbyLinkHeader));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div className="lobbyLinkRow">
			<div className="lobbylinkId">
				<p>#</p>
			</div>
			<div className="lobbyLinkHost">
				<p>HOST</p>
			</div>
			<div className="lobbyLinkStatus">
				<p>STATUS</p>
			</div>
			<div className="lobbyLinkNbPlayer">
				<p>PLAYERS</p>
			</div>
			<div className="lobbyLinkJoin">
				<p>JOIN</p>
			</div>
		</div>
		)
	})

	it('test lobbyLink is ongoing', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(LobbyLink, {ongoing: 2, id: 0, playerName: 'test', nbPlayer: 3, handleClick: handleClick()}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div className="lobbyLinkRow">
			<div className="lobbylinkId">
				<p>0</p>
			</div>
			<div className="lobbyLinkHost">
				<p>test</p>
			</div>
			<div className="lobbyLinkStatus">
				<p>Ongoing</p>
			</div>
			<div className="lobbyLinkNbPlayer">
				<p>3 / 5</p>
			</div>
			<div className="lobbyLinkJoin">
				<button
					className="enterLobbyRoom"
					type="button"
					onClick={() => handleClick(0, 'test')}
				>
					ENTER
				</button>
			</div>
		</div>
		)
	})

	it('test lobbyLink is pending', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(LobbyLink, {ongoing: 0, id: 0, playerName: 'test', nbPlayer: 3, handleClick: handleClick()}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div className="lobbyLinkRow">
			<div className="lobbylinkId">
				<p>0</p>
			</div>
			<div className="lobbyLinkHost">
				<p>test</p>
			</div>
			<div className="lobbyLinkStatus">
				<p>Pending</p>
			</div>
			<div className="lobbyLinkNbPlayer">
				<p>3 / 5</p>
			</div>
			<div className="lobbyLinkJoin">
				<button
					className="enterLobbyRoom"
					type="button"
					onClick={() => handleClick(0, 'test')}
				>
					ENTER
				</button>
			</div>
		</div>
		)
	})
})

describe('Test Piece', function() {
	it('test piece', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(Piece, {mainBoard: true}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div
			className={`flex-row-item mainPieceHeight`}
			id={undefined}>
		</div>
		)
	})
	
	it('test otherPiece', function() {
		const renderer = createRenderer();
		renderer.render(React.createElement(Piece, {mainBoard: false}));
		const output = renderer.getRenderOutput();
		output.props.className.should.equal("flex-row-item otherPieceHeight")
	})
})

describe('Test PrintWinnerLoser', function() {
	it('test PrintWinnerLoser without player', function(){
		const renderer = createRenderer();
		renderer.render(React.createElement(PrintWinnerLooser));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div>
			<h3>
				WINNER IS {undefined}
			</h3>
		</div>
		)
	})

	it('test PrintWinnerLoser without player', function(){
		const renderer = createRenderer();
		renderer.render(React.createElement(PrintWinnerLooser, {role: PLAYER, winner: 'test', playerName: 'test'}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div>
			<h2>
				YOU WIN
			</h2>
			<h3>
				WINNER IS TEST
			</h3>
		</div>
		)
	})
})

const handleClickChangeOwner = (playerName) => {
}

describe('Test UserInRoom', function() {
	it('test UserInRoom with spectator', function() {
		const renderer = createRenderer();
		let users = [
			{
				playerName: "test",
			}
		]
		renderer.render(React.createElement(UserInRoom, {title: "SPECTATOR", nbUser: 4, users: users}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div className="userInRoom">
			<h3 className="userInRoomTitle">
				SPECTATOR
			</h3>
			<p className="printNbUser">4</p>
			<ul>
				{users && users.map((user, index) => 
					index < 10 &&
					<li key={index}
						id="spectatorList"
					>
						<p id="changeOwnerBlank"></p>
						test
					</li>
				)}
			</ul>
		</div>
		)
	})

	it('test UserInRoom with player and all props', function() {
		const renderer = createRenderer();
		let users = [
			{
				playerName: "test",
			},
			{
				playerName: "toto",
			},
		]
		let owner = "test";
		let playerName = "test";
		renderer.render(React.createElement(UserInRoom, {title: "PLAYERS", nbUser: 4, users: users, winner: "test", owner: owner, isOwner: true, playerName: "test"}));
		const output = renderer.getRenderOutput();
		output.should.equalJSX(
		<div className="userInRoom">
			<h3 className="userInRoomTitle">
				PLAYERS
			</h3>
			<p className="printNbUser">4 / 5</p>
			<ul>
				{users && users.map((user, index) => 
					index < 10 &&
					<li key={index}
						id="playerList"
					>
						{owner !== user.playerName
						? <input
								id="changeOwnerButton"
								type="button"
								value="👑"
								onClick={() => handleClickChangeOwner(user.playerName)}
							/>
						: <p id="changeOwnerBlank"></p>}
						{user.playerName}
						{owner === user.playerName 
						&& "  👑"}
						{user.playerName === playerName
						&& "  👤  😎"}
					</li>
				)}
			</ul>
		</div>
		)
	})
})