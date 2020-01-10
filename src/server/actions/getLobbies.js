import {GETLOBBIES} from '../config/config_socket'

export const getLobbies = (lobbies) => {
  return {
    type: GETLOBBIES,
    lobbies: lobbies
  }
}