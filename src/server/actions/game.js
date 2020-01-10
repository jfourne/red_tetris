import {T_BOARD, T_GAME_START, T_GAME_END} from '../config/config_socket'

export const board = (board) => {
  return {
    type: T_BOARD,
    board: board
  }
}

export const gameStart = () => {
  return {
    type: T_GAME_START
  }
}

export const gameEnd = (winner) => {
  return {
    type: T_GAME_END,
    winner: winner
  }
}