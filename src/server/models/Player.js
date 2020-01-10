import Board from './Board'
import * as event from '../config/config_socket'

class Player {
  constructor(socket) {
    this._socket = socket
	this._id = socket.id.substring(0, 4);
    this._name = undefined
    this._board = undefined
  }

  getName(){
    return this._name;
  }

  getSocket(){
    return this._socket;
  }

  getBoard(){
    if (this._board === undefined)
      return undefined
    return this._board;
  }

  initPlayer(name){
    this._name = `(${this._id})${name}`;
  }

  initPlayerGame(seed){
    this._isPlayer = true;
    this._board = new Board(this._socket, seed)
    this._socket.on(event.RECEIVE + event.T_LEFT_ARROW, () => {
      this._board.playerAction(event.T_LEFT_ARROW)
    })
    this._socket.on(event.RECEIVE + event.T_RIGHT_ARROW, () => {
      this._board.playerAction(event.T_RIGHT_ARROW)
    })
    this._socket.on(event.RECEIVE + event.T_UP_ARROW, () => {
      this._board.playerAction(event.T_UP_ARROW)
    })
    this._socket.on(event.RECEIVE + event.T_DOWN_ARROW, () => {
      this._board.playerAction(event.T_DOWN_ARROW)
    })

    console.log("Player " + this._id + " board created")
  }
}

export default Player