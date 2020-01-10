import {P_NONE, P_DEFAULT} from './config_piece'

export const GRID_HEIGHT = 20
export const GRID_WIDTH = 10

export const FALL_DELAY_MS = 1000

const emptyLine = new Array(GRID_WIDTH).fill(P_NONE)
export const emptyBoard = [...new Array(GRID_HEIGHT)].map(() => emptyLine.slice());

export const comboLine = new Array(GRID_WIDTH).fill(P_DEFAULT)

export const disconnectedBoard2010 = (GRID_HEIGHT === 20 && GRID_WIDTH === 10) ?
emptyBoard.map((arr) => {
  return arr.slice();
}) : undefined

if (GRID_HEIGHT === 20 && GRID_WIDTH === 10) {
  disconnectedBoard2010[5] = [0, 0, 0, 0, 0, 0, 3, 3, 0, 0]
  disconnectedBoard2010[6] = [0, 0, 0, 0, 0, 3, 3, 0, 0, 0]
  disconnectedBoard2010[7] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0]
  disconnectedBoard2010[8] = [0, 0, 0, 3, 3, 0, 0, 0, 0, 0]
  disconnectedBoard2010[9] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0]
  disconnectedBoard2010[10] = [0, 0, 0, 0, 0, 3, 3, 0, 0, 0]
  disconnectedBoard2010[11] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0]
  disconnectedBoard2010[12] = [0, 0, 0, 3, 3, 0, 0, 0, 0, 0]
  disconnectedBoard2010[13] = [0, 0, 3, 3, 0, 0, 0, 0, 0, 0]
}
