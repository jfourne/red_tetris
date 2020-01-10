/**
 * socket.on Events
 */

export const CONNECT = 'connection'
export const DISCONNECT = 'disconnect'

/**
 *  signals and types: format
 */

export const SIGNAL = 'action_'
export const TYPE = 'server/'


/**
 * signals and type: receive & emit
 */


// signal & type
export const INIT_PLAYER = 'initPlayer'
export const LEAVE_LOBBY = 'leaveLobby'
export const GETLOBBIES = 'getLobbies' // emit
export const ERROR = 'myError' // emit

// signal
export const MAINLOBBY = 'mainLobby'
// type
export const T_CREATE_LOBBY = 'createLobby' // emit in lobby
export const T_JOIN_LOBBY = 'joinLobby'
export const T_GET_LOBBIES = 'getLobbies'


// signal
export const LOBBY = 'lobby'
// type
export const T_SWITCH_ROLE = 'switchRole'
export const T_SET_OWNER = 'setOwner'
export const T_SET_LOBBY_OWNER = 'setLobbyOwner'
export const T_GET_USERS = 'getUsers'
export const T_GAME_START = 'gameStart' // emit in game 
export const T_LOBBY_DELETED = 'lobbyDeleted' // emit


// signal
export const GAME = 'game'
// type
export const T_LEFT_ARROW = 'leftArrow'
export const T_RIGHT_ARROW = 'rightArrow'
export const T_UP_ARROW = 'upArrow'
export const T_DOWN_ARROW = 'downArrow'
export const T_SPACE = 'space'
export const T_BOARD = 'board' // emit (send board)
export const T_GAME_END = 'gameEnd' //emit