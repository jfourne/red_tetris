import {INIT_PLAYER} from '../config/config_socket'

export const initPlayer = (name) => {
  return {
    type: INIT_PLAYER,
    name: name
  }
}
