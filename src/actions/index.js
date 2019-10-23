import axios from 'axios';


export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export function login(username, password) {
  const request = axios.put(`users/login`, {username, password});

  return {
    type: LOGIN,
    payload: request
  }
}

export function register(payload) {
  const request = axios.post(`/users/register`, payload);

  return {
    type: REGISTER,
    payload: request
  }
}

export const GET_GAME = 'GET_GAME'
export const GET_GAMES_TO_JOIN = 'GET_GAMES_TO_JOIN';
export const CREATE_GAME = 'CREATE_GAME';
export const JOIN_GAME = 'JOIN_GAME';
export const PLAY_CARDS = 'PLAY_CARDS';
export const PASS = 'PASS';
export const GIVE_DRINK ='GIVE_DRINK';
export const DRINK_DRINK = 'DRINK_DRINK';
export const START_GAME = 'START_GAME';


export function getGame(id) {

  return async (dispatch, getState) => {
    const request = await axios.get(`presidents/${id}`);
    const userId = getState().user._id;

    return dispatch({
      type: GET_GAME,
      payload: request,
      userId
    });

  }
}

export function getGamesToJoin() {
  const request = axios.get(`/presidents`);

  return {
    type: GET_GAMES_TO_JOIN,
    payload: request
  }
}

export function createGame(payload) {
  const request = axios.post(`/presidents/create`, payload);

  return {
    type: CREATE_GAME,
    payload: request
  }
}

export function joinGame(id) {

  return async (dispatch, getState) => {
    const userId = getState().user._id;
    const payload = { userId };
    const request = await axios.put(`/presidents/${id}/join`, payload);

    return dispatch({
      type: JOIN_GAME,
      payload: request,
      userId
    })

  }
}

export function playCards(id, cardsPlayed) {

  return async (dispatch, getState) => {
    const user = getState().user;
    const wasPassed = false;
    const request = await axios.put(`presidents/${id}/processTurn`, {user, cardsPlayed, wasPassed});

    return dispatch({ 
      type: PLAY_CARDS, 
      payload: request,
      userId: user._id
    });

  }
}

export function pass(id) {

  return async (dispatch, getState) => {
    const user = getState().user._id;
    const wasPassed = false;
    const request = await axios.put(`presidents/${id}/processTurn`, {user, cardsPlayed: [], wasPassed});

    return dispatch({ 
      type: PASS, 
      payload: request
    });

  }
}

export function giveDrink(id, toUser) {

  return async (dispatch, getState) => {
    const fromUser = getState().user._id;
    const request = await axios.put(`presidents/${id}/giveDrink`, {fromUser, toUser});

    return dispatch({ 
      type: PASS, 
      payload: request
    });

  }
}

export function drinkDrink(id) {

  return async (dispatch, getState) => {
    const user = getState().user._id;
    const request = await axios.put(`presidents/${id}/giveDrink`, {user});

    return dispatch({ 
      type: DRINK_DRINK, 
      payload: request
    });

  }
}

export function startGame(id) {

  return async (dispatch, getState) => {
    const userId = getState().user._id;
    const request = await axios.put(`/presidents/${id}/initialize`);

    return dispatch({
      type: START_GAME,
      payload: request,
      userId
    });

  }
}