import { ERROR } from '../config/config_socket'
import { myError } from '../actions/myError'
 
 export const  reduce2DArray = (arr) => {
  const reducedArray = arr.reduce((prevArr, currentArr) => {
    return prevArr.concat(currentArr)
  }, [])
  return reducedArray
}

export const emitError = (socket, message) => {
  socket.emit(ERROR, myError(message))
}