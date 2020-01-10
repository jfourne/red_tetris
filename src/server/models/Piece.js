import * as p_conf from '../config/config_piece'
import {GRID_HEIGHT, GRID_WIDTH}  from '../config/config_board'

class Piece {
  constructor(type){
    this._type = type + p_conf.P_I
    this._piece = p_conf.PIECES[type].slice()
    this._rot = p_conf.ROT_0
    this._pos = {x: Math.trunc(GRID_WIDTH/2) - 2, y: 0}
    if (this._type === p_conf.P_O)
      this._pos.x += 1
    if (this._type === p_conf.P_I)
      this._pos.y -= 1
  }

  getPiece(){
    return({
      piece: this._piece[this._rot],
      pos: this._pos  
    })
  }

  getWallKick(type, cur_rot, next_rot){
    const wallKicks = type === p_conf.P_I ? p_conf.BLOCKI_KICK : p_conf.BLOCK_KICK;
    for (let i = 0; i < wallKicks.length; i++) { 
      if (wallKicks[i].from === cur_rot && wallKicks[i].to === next_rot)
      return wallKicks[i].tests;
    }
    return undefined;
  }



  moveDown(board){
    if (this.isPlaceable(
      board,
      this._piece[this._rot],
      this._pos.x,
      this._pos.y + 1))
    {
      this._pos.y += 1
      return true
    }
    return false
  }

  moveRight(board){
    if (this.isPlaceable(
      board,
      this._piece[this._rot],
      this._pos.x + 1,
      this._pos.y))
    {
      this._pos.x += 1
      return true
    }
    return false
  }

  moveLeft(board){
    if (this.isPlaceable(
      board,
      this._piece[this._rot],
      this._pos.x - 1,
      this._pos.y))
    {
      this._pos.x -= 1
      return true
    }
    return false
  }

  // need to implement wall kick on the rotations
  rotateRight(board){
    if (this._type === p_conf.P_O)
      return true
    const wallKicks = this.getWallKick(this._type, this._rot, (this._rot + 1) % 4)
    for (let i = 0; i < wallKicks.length; i++) {
      if (this.isPlaceable(
        board,
        this._piece[(this._rot + 1) % 4],
        this._pos.x + wallKicks[i][0],
        this._pos.y + wallKicks[i][1]))
      {
        this._pos.x += wallKicks[i][0];
        this._pos.y += wallKicks[i][1];
        this._rot = (this._rot + 1) % 4;
        return true;
      }
    };
    return false;
  }

  rotateLeft(board){
    if (this._type === p_conf.P_O)
      return true
    const wallKicks = this.getWallKick(this._type, this._rot, (this._rot + 1) % 4)
    for (let i = 0; i < wallKicks.length; i++) {
      if (this.isPlaceable(
        board,
        this._piece[(this._rot - 1) % 4],
        this._pos.x + wallKicks[i][0],
        this._pos.y + wallKicks[i][1]))
      {
        this._pos.x += wallKicks[i][0];
        this._pos.y += wallKicks[i][1];
        this._rot = (this._rot - 1) % 4;
        return true;
      }
    };
    return false;
  }

  isPlaceable(board, piece, pos_x, pos_y){
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] != p_conf.P_NONE) {
          if (pos_x + x < 0 || pos_x + x >= GRID_WIDTH
              || pos_y + y < 0 || pos_y + y >= GRID_HEIGHT) {
              return false
          }
          if (board[y + pos_y][x + pos_x] != p_conf.P_NONE){
              return false
          }
        }
      }
    }
    return true;
  }

  isOverlapping(board){
    const piece = this._piece[this._rot];
    const pos_x = this._pos.x;
    const pos_y = this._pos.y;
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] != p_conf.P_NONE) {
          if (pos_x + x >= 0 && pos_x + x < GRID_WIDTH
            && pos_y + y >= 0 && pos_y + y < GRID_HEIGHT) {  
            if (board[y + pos_y][x + pos_x] != p_conf.P_NONE)
              return true
          }
        }
      }
    }
    return false;
  }
}

export default Piece