import Piece from './Piece'

import {emptyBoard, comboLine, disconnectedBoard2010, FALL_DELAY_MS, GRID_HEIGHT, GRID_WIDTH} from '../config/config_board'
import {NB_PIECES, P_NONE, P_DEFAULT, P_PREV} from '../config/config_piece'
import {TICK_LENGTH_MS} from '../config/config_game'
import * as event from '../config/config_socket'
import * as gameAction from '../actions/game'
import RandomSeed from '../services/randomseed'
import {reduce2DArray} from '../services/utility'
import { throws } from 'assert'

class Board {
  constructor(socket, id, seed, broadcast, broadcastBoardSpectator){
    this._socket = socket;
    this._id = id;
    this._isAlive = true;
    this._isDisconnected = false;
    this._board = emptyBoard.map((arr) => {
      return arr.slice();
    });
    this._randomSeed = new RandomSeed(seed)
    this._piece = new Piece(Math.trunc(this._randomSeed.next()) % NB_PIECES)
    this._prevFall = Date.now()
    this._broadcastBoard = broadcast.board
	  this._broadcastCombo = broadcast.combo;
	  this._broadcastBoardSpectator = broadcastBoardSpectator;
    this.sendBoard(reduce2DArray(this.getBoardWithPiece()));
    console.log("Board created " + id)
  }

  isAlive() {
    return this._isAlive;
  }

  getBoard(){
    return this._board;
  }

  getBoardWithPiece(){
    const p = this._piece.getPiece()
    let ghost_y = p.pos.y;
    const ret = []
    for (var len = 0; len < GRID_HEIGHT; len++)
      ret[len] = this._board[len].slice();
    while (this._piece.isPlaceable(this._board, p.piece, p.pos.x, ghost_y))
      ghost_y++;
    ghost_y--;
    for (let y = 0; y < p.piece.length; y++) {
      for (let x = 0; x < p.piece[y].length; x++) {
        if (p.pos.x + x >= 0 && p.pos.x + x < GRID_WIDTH
          && p.pos.y + y >= 0 && p.pos.y + y < GRID_HEIGHT) {  
          if (p.piece[y][x] != P_NONE
              && ret[y + p.pos.y][x + p.pos.x] === P_NONE)
          {
            ret[y + p.pos.y][x + p.pos.x] = p.piece[y][x]
          }
        }
      }
    }
    for (let y = 0; y < p.piece.length; y++) {
      for (let x = 0; x < p.piece[y].length; x++) {
        if (p.pos.x + x >= 0 && p.pos.x + x < GRID_WIDTH
          && ghost_y + y >= 0 && ghost_y + y < GRID_HEIGHT) {  
          if (p.piece[y][x] != P_NONE
              && ret[y + ghost_y][x + p.pos.x] === P_NONE)
          {
            ret[y + ghost_y][x + p.pos.x] = p.piece[y][x] + P_PREV
          }
        }
      }
    }
    return ret
  }

  setBoardWithPiece(){
    const p = this._piece.getPiece()
    const board = this._board
    let ret = true

    for (let y = 0; y < p.piece.length; y++) {
      for (let x = 0; x < p.piece[y].length; x++) {
        if (p.piece[y][x] != P_NONE) {
          if (p.pos.x + x >= 0 && p.pos.x + x < GRID_WIDTH
            && p.pos.y + y >= 0 && p.pos.y + y < GRID_HEIGHT) {  
            if (board[y + p.pos.y][x + p.pos.x] != P_NONE)
              ret = false;
            else
              board[y + p.pos.y][x + p.pos.x] = p.piece[y][x]
          } else {
            ret = false;
          }
        }
      }
    }
    this._broadcastBoard(this._id);
    return ret
  }

  checkFullLine(){
    let isFull;
    let count = 0;
    for(let line = 0; line < this._board.length; line++){
      isFull = true
      for(let col = 0; col < this._board[line].length; col++){
        if (this._board[line][col] === P_NONE)
          isFull = false;
      }
      if (isFull && this._board[line][0] != P_DEFAULT) {
        count += 1;
        for(let moveLine = line; moveLine > 0; moveLine--){
          for(let moveCol = 0; moveCol < this._board[moveLine].length; moveCol++){
            this._board[moveLine][moveCol] = this._board[moveLine - 1][moveCol]
            this._board[moveLine - 1][moveCol] = P_NONE
          }
        }
      }
    }
    return count;
  }

  receiveCombo(combo){
    console.log("RECEIVE COMBO + " + combo);
    if (this._piece._pos.y - combo >= 0)
      this._piece._pos.y -= combo;
    for(let line = combo; line < this._board.length ; line++) {
      this._board[line - combo] = this._board[line];
    }
    for(let line = 0; line < combo ; line++) {
      this._board[this._board.length - 1 - line] = comboLine.slice();
    }
  }

  update(){
    if (this._isAlive)
    {
     if (Date.now() - this._prevFall > FALL_DELAY_MS){
        this._prevFall = Date.now()
        const isChanged = this._piece.moveDown(this._board)
        if (isChanged) {
          this.sendBoard(reduce2DArray(this.getBoardWithPiece()));
        }
        else if (!isChanged){
          this.placePiece()
        }
      }
    }
  }

  placePiece(){
    if (!this.setBoardWithPiece())
      this._isAlive = false;
    const count = this.checkFullLine();
    if (count >= 2)
      this._broadcastCombo(this._id, count - 1)
    this._piece = new Piece(Math.trunc(this._randomSeed.next()) % NB_PIECES);
    //edge case, spawn piece above board
    if (this._piece.isOverlapping(this._board))
    {
      while(this._piece.isOverlapping(this._board))
        this._piece._pos.y -= 1;
    }
    this.sendBoard(reduce2DArray(this.getBoardWithPiece()));
  }

  playerAction(type){
    let ret = true
    switch(type){
      case event.T_LEFT_ARROW :
        this._piece.moveLeft(this._board);
        break;
      case event.T_RIGHT_ARROW :
        this._piece.moveRight(this._board);
        break;
      case event.T_UP_ARROW :
        this._piece.rotateRight(this._board);
        break;
      case event.T_DOWN_ARROW :
        this._prevFall = Date.now()
        const isChanged = this._piece.moveDown(this._board)
        if (isChanged) {
          this.sendBoard(reduce2DArray(this.getBoardWithPiece()));
        }
        else if (!isChanged){
          this.placePiece()
          ret = false;
        }
        break;
      case event.T_SPACE :
        this._prevFall = Date.now()
        while(this._piece.moveDown(this._board));
        this.placePiece();
        break;
    }
    this.sendBoard(reduce2DArray(this.getBoardWithPiece()));
    return ret;
  }

  sendBoard(board){
    this._socket.emit(event.GAME, gameAction.board({
      board : board,
      id : this._socket.id,
      main: true
	}))
	this._broadcastBoardSpectator(board, this._socket.id, this._id);
  }

  disconnect(){
    this._isAlive = false;
    this._isDisconnected = true;
    this._board = disconnectedBoard2010;
    this._broadcastBoard(this._id);
  }
}

export default Board