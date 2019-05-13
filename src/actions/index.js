import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const GET_GAMES_TO_JOIN = 'GET_GAMES_TO_JOIN';

export function loginUser(payload) {
  const request = axios.post(`/login`, payload);

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function updateGame(payload) {
  return {
    type: UPDATE_GAME,
    payload
  }
}

export function createGame(payload) {
  const request = axios.post(`/games/create`, payload);

  return {
    type: CREATE_GAME,
    payload: request
  }
}

export function joinGame(payload) {
  const request = axios.post(`/games/join`, payload);

  return {
    type: JOIN_GAME,
    payload: request
  }
}

export function getGamesToJoin() {
  const request = axios.get(`/games`);

  return {
    type: GET_GAMES_TO_JOIN,
    payload: request
  }
}

export function createAccount(payload) {
  const request = axios.post(`/users/create`, payload);

  return {
    type: CREATE_ACCOUNT,
    payload: request
  }
}