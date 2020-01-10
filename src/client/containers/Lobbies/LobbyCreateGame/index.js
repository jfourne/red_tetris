import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./LobbyCreateGame.css";
import { START, SWITCH_ROLE } from '../../../constants/buttonLobby';
import ButtonLobby from '../ButtonLobby';
import { getSocket } from '../../../selectors/socket';
import { getRoomInfo } from '../../../selectors/roomInfo';
import { getPlayerInfo } from '../../../selectors/playerInfo';
import { CLIENT_ADDR } from '../../../constants/socket';
import CreateName from '../../CreateName';
import PrintWinnerLooser from '../../../components/PrintWinnerLooser';
import PrintCurrRoom from '../../../components/PrintCurrRoom';
import { getPlayersInRoom } from '../../../selectors/playersInRoom';
import { getSpecatorsInRoom } from '../../../selectors/spectatorsInRoom';
import UserInRoom from '../../../components/UserInRoom';
import { switchPlayerRole, changeOwner } from '../../../actions/playerInfo';
import { SPECTATOR, PLAYER } from '../../../constants/playerRole';
import { getForceQuitLobby } from '../../../selectors/forceQuitLobby';
import { forceQuitLobby } from '../../../actions/forceQuitLobby';
import { clearGame } from '../../../actions/roomInfo';
import { ACTION_LOBBY } from '../../../constants/eventHandler';
import { servGameStart, servSwitchRole, servSetOwner } from '../../../actions/server';

const LobbyCreateGame = ({
	socket,
	roomInfo,
	playerInfo,
	playersInRoom,
	spectatorsInRoom,
	lobbyDeleted,
	forceQuitLobby,
	clearGame,
	ownProps,
}) => {
	
	const pathNameNoslash = ownProps.location.pathname.slice(1)
	const findUrlNameStart = pathNameNoslash.indexOf('[');
	const findUrlNameEnd = pathNameNoslash.indexOf(']');
	const findUrlRoomId = pathNameNoslash.substring(0, findUrlNameStart);
	const findUrlRoomName = pathNameNoslash.substring(findUrlNameStart + 1, findUrlNameEnd);
	const fullAddrRoom = CLIENT_ADDR + "/#" + pathNameNoslash;
	let winner = "";
	if (roomInfo.roomInfoState && roomInfo.roomInfoState.winner)
		winner = roomInfo.roomInfoState.winner.winner;

	if (lobbyDeleted
		|| (roomInfo.roomInfoState
			&& roomInfo.roomInfoState.id === -1)) {
		if (lobbyDeleted)
			forceQuitLobby(false);
		clearGame();
		ownProps.history.push('/');
	}
	
	console.log(findUrlRoomName);
	const handleClickStart = () => {
		socket.socket.emit(ACTION_LOBBY, servGameStart(roomInfo.roomInfoState.id));
	}

	const handleClickSwitch = () => {
		if (playerInfo.role === SPECTATOR && playersInRoom.length > 4) {
			alert("Players in the room has reached its limit")
		}
		else {
			socket.socket.emit(ACTION_LOBBY, servSwitchRole(playerInfo.name, playerInfo.role))
		}
	}

	const handleClickChangeOwner = (playerName) => {
		socket.socket.emit(ACTION_LOBBY, servSetOwner(playerName));
	}

	return (
		<div>
			{ playerInfo.length === 0 
			? <CreateName sendName={true}
							roomId={findUrlRoomId}
							roomName={findUrlRoomName}/>
			: <div className="lobbyCreateGame">
				<div className="printWinner">
				{ roomInfo.roomInfoState && roomInfo.roomInfoState.winner
				&& <PrintWinnerLooser
						winner={roomInfo.roomInfoState.winner.winner}
						playerName={playerInfo.name}
						role={playerInfo.role}
					/>}
				</div>
				<div className="loadRoomPlayers">
					<UserInRoom
						title="PLAYERS"
						users={playersInRoom}
						nbUser={playersInRoom.length}
						isOwner={playerInfo.isOwner}
						owner={roomInfo.roomInfoState.owner}
						playerName={playerInfo.name}
						winner={winner}
						handleClickChangeOwner={handleClickChangeOwner}
					/>
					<UserInRoom
						title="SPECTATORS"
						users={spectatorsInRoom}
						nbUser={spectatorsInRoom.length}
						playerName={playerInfo.name}
						winner={winner}
					/>
				</div>
				<br />
				<PrintCurrRoom fullAddrRoom={fullAddrRoom} />
				<div>
				{ playerInfo.isOwner
				&& <ButtonLobby
						buttonName={START}
						handleClick={() => handleClickStart()}/>
				}
				</div>
				<div>
					{ !playerInfo.isOwner
					&& <ButtonLobby
						buttonName={SWITCH_ROLE}
						handleClick={() => handleClickSwitch()}/>
					}
				</div>
			 </div>
			}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	socket: getSocket(state),
	roomInfo: getRoomInfo(state),
	playerInfo: getPlayerInfo(state),
	playersInRoom: getPlayersInRoom(state),
	spectatorsInRoom: getSpecatorsInRoom(state),
	lobbyDeleted: getForceQuitLobby(state),
	ownProps: ownProps,
})

const mapDispatchToProps = (dispatch) => ({
	forceQuitLobby: () => dispatch(forceQuitLobby(false)),
	clearGame: () => dispatch(clearGame()),
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(LobbyCreateGame));