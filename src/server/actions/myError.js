import {ERROR} from '../config/config_socket'

export const myError = (error) => {
  return {
    type: 'error',
    error: error
  }
}