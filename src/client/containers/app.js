import React from 'react'
import ButtonStart from './ButtonStart';
import './app.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as buttonName from '../constants/buttonStartName';
import { getPlayerInfo } from '../selectors/playerInfo';
import CreateName from './CreateName';

export const App = ({playerInfoState}) => {

  return (
	<div className="gamePage">
			{!playerInfoState || playerInfoState.length === 0
			? <CreateName sendName={false} roomId={-1} roomName={undefined}/>
			: <div className="flex-button-home">
				<ButtonStart buttonName={buttonName.QUICK_START}/>
				<ButtonStart buttonName={buttonName.MULTIPLAYER}/>
			</div>
			}
	</div>
  )
}

const mapStateToProps = (state) => ({
	playerInfoState: getPlayerInfo(state),
})

export default withRouter(connect(
	mapStateToProps,
)(App));