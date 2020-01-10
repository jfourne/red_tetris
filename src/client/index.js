import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom';
import {alert} from './actions/alert'
import store from './store';
import App from './containers/app'
import io from "socket.io-client"
import GameTitle from './components/GameTitle';
import "./containers/app.css";
import { thunkCreateSocket } from './middleware/thunkAction';
import { SERV_ADDR } from './constants/socket';
import Lobbies from './containers/Lobbies';
import HomePageButton from './containers/HomePageButton';
import LoadGamePage from './containers/LoadGamePage';
import WaitGameCreate from './containers/WaitGameCreate';

const socket = io.connect(SERV_ADDR);

store.dispatch(thunkCreateSocket(socket));

ReactDom.render((
	<Provider store={store}>
		<HashRouter hashType="noslash">
		<HomePageButton />
		<div className="flex-game-home">
			<div>
				<GameTitle />
			</div>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/:room[:playerName]" component={LoadGamePage} />
				<Route exact path="/lobbies/:gameMode" component={Lobbies} />
				<Route
					path="/lobbies/multiplayer/loadGamePage"
					component={WaitGameCreate} />
				<Route
					path="/loadGamePage"
					component={WaitGameCreate} />
			</Switch>
		</div>
		</HashRouter>
	</Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
