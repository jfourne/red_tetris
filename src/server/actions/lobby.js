import {T_CREATE_LOBBY, T_GET_USERS, T_SET_OWNER,
    T_SET_LOBBY_OWNER, T_SWITCH_ROLE, T_LOBBY_DELETED} from '../config/config_socket'

export const createLobby = (lobby) => {
  return {
    type: T_CREATE_LOBBY,
    lobby: lobby
  }
}

export const getUsers = (users) => {
  return {
    type: T_GET_USERS,
    users: users
  }
}

export const setOwner = (isOwner) => {
  return {
    type: T_SET_OWNER,
    isOwner: isOwner
  }
}

export const setLobbyOwner = (owner) => {
  return {
    type: T_SET_LOBBY_OWNER,
    owner: owner
  }
}

export const switchRole = () => {
  return {
    type: T_SWITCH_ROLE,
  }
}

export const lobbyDeleted = () => {
  return {
    type: T_LOBBY_DELETED,
  }
}