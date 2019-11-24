import axios from '../config/axios';
import { notification } from 'antd';
// NOTIFICATION

const openNotificationWithIcon = type => message => description => {
  notification[type]({
    message,
    description
  });
};

export const successNotification = (message, description) => {
  openNotificationWithIcon('success')(message)(description);

  return { 
    type: 'SUCCESS_NOTIFICATION'
  }
}



export const infoNotification = (message, description) => {
  openNotificationWithIcon('info')(message)(description);

  return { 
    type: 'INFO_NOTIFICATION'
  }
}


export const warningNotification = (message, description) => {
  openNotificationWithIcon('warning')(message)(description);

  return { 
    type: 'WARNING_NOTIFICATION'
  }
}


export const errorNotification = (message, description) => {
  openNotificationWithIcon('error')(message)(description);

  return { 
    type: 'ERROR_NOTIFICATION'
  }
}

// USER



export const LOGIN = 'LOGIN';

export function loginUser(username, password) {
  const request = axios.put(`users/login`, {username, password});

  return {
    type: LOGIN,
    payload: request
  }
}

export function login(username, password) {

  return async (dispatch, getState) => {
    try {
      await dispatch(loginUser(username, password));
      dispatch(successNotification('Log In Successful', 'Welcome back!'));
    } catch (err) {
      dispatch(errorNotification('Log In Failed', err.response.data));
    }
  }
}

export const LOGOUT = 'LOGOUT';

export function logout() {
  return {
    type: LOGOUT
  }
}




export const REGISTER = 'REGISTER';

export function registerUser(payload) {
  const request = axios.post(`/users/register`, payload);

  return {
    type: REGISTER,
    payload: request
  }
}

export function register(payload) {

  return async (dispatch, getState) => {
    try {
      await dispatch(registerUser(payload));
      dispatch(successNotification('Registration Successful', 'Welcome aboard!'));
    } catch (err) {
      dispatch(errorNotification('Registration Failed', err.response.data));
    }
  }
}




export const GET_USER = 'GET_USER';

export function getUser(id) {
  const request = axios.get(`users/${id}`);

  return {
    type: GET_USER,
    payload: request
  }

}

// GAME

export const GET_GAME = 'GET_GAME'

export function getGame(id) {

  return async (dispatch, getState) => {
    const request = await axios.get(`presidents/${id}`);
    const userId = getState().user._id;

    try {

      await dispatch({
        type: GET_GAME,
        payload: request,
        userId
      });

      dispatch(successNotification('Game Rejoined', 'Good luck'));

      

    }
    catch (err) {

      console.log(err)
      dispatch(errorNotification('Unable to create the game', err.response.data));

    }

  }
}


export const GET_GAMES_TO_JOIN = 'GET_GAMES_TO_JOIN';
export function getGamesToJoin() {
  const request = axios.get(`/presidents`);

  return {
    type: GET_GAMES_TO_JOIN,
    payload: request
  }
}



export const CREATE_GAME = 'CREATE_GAME';
export function createGame(payload) {

  return async (dispatch, getState) => {

    try {

      const userId = getState().user._id;
      const request = await axios.post(`/presidents/create`, payload);
  
      await dispatch({
        type: CREATE_GAME,
        payload: request
      });
  
      await dispatch(getUser(userId));

      dispatch(successNotification('Game Created', 'Great success!'))

    } catch (err) {

      console.log(err)
      dispatch(errorNotification('Unable to create the game', err.response.data));

    }
    
  }

}

export const JOIN_GAME = 'JOIN_GAME';
export function joinGame(id) {

  return async (dispatch, getState) => {

    try {

      const userId = getState().user._id;
      const payload = { userId };
      const request = await axios.put(`/presidents/${id}/join`, payload);
  
      dispatch({
        type: JOIN_GAME,
        payload: request,
        userId
      });

      dispatch(successNotification('You have joined the game', 'Great success!'))

    } catch (err) {
      
      console.log(err)
      dispatch(errorNotification('Unable to join the game', err.response.data));

    }

  }
}

export const PLAY_CARDS = 'PLAY_CARDS';
export function playCards(id, cardsPlayed) {

  return async (dispatch, getState) => {

    try {

      const user = getState().user;
      const wasPassed = false;
      const request = await axios.put(`presidents/${id}/processTurn`, {user, cardsPlayed, wasPassed});
  
      await dispatch({ 
        type: PLAY_CARDS, 
        payload: request,
        userId: user._id
      });

      dispatch(successNotification('Turn Accepted', 'Nice.'));

    } catch (err) {

      dispatch(errorNotification('Invalid Turn', err.response.data));
    
    }
    

  }
}

export const PASS = 'PASS';
export function pass() {

  return async (dispatch, getState) => {

    try {

      const state = getState();
      const {user} = state;
      const id = state.game._id;
      const wasPassed = true;

      const request = await axios.put(`presidents/${id}/processTurn`, {user, cardsPlayed: [], wasPassed});

      dispatch({ 
        type: PASS, 
        payload: request
      });

      dispatch(infoNotification('You passed', 'nothing to see here.'));

    } catch (err) {

      dispatch(errorNotification('You can\'t pass', err.response.data));

    }

  }
}

export const GIVE_DRINK ='GIVE_DRINK';
export function giveDrink(toUser) {

  return async (dispatch, getState) => {

    try {
      const state = getState();
      const fromUser = state.user._id;
      const gameId = state.game._id;
      const request = await axios.put(`presidents/${gameId}/giveDrink`, {fromUser, toUser});

      dispatch({ 
        type: GIVE_DRINK, 
        payload: request
      });

    } catch (err) {

      dispatch(errorNotification('Drink not given', err.response.data))

    }

  }
}

export const DRINK_DRINK = 'DRINK_DRINK';
export function drinkDrink() {

  return async (dispatch, getState) => {

    try {
      const state = getState();
      const userId = state.user._id;
      const gameId = state.game._id;
      const request = await axios.put(`presidents/${gameId}/drinkDrink`, {userId});
  
      dispatch({ 
        type: DRINK_DRINK, 
        payload: request
      });

      dispatch(successNotification('Drink Dranken', 'gulp gulp'));

    } catch (err) {

      dispatch(errorNotification('Drink Not Dranken', 'no drink for you'));

    }
    

  }
}

export const START_GAME = 'START_GAME';
export function startGame() {

  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.user._id;
    const id = state.game._id


    try {

      const request = await axios.put(`/presidents/${id}/initialize`);

      dispatch({
        type: START_GAME,
        payload: request,
        userId
      });

      dispatch(successNotification('Game Started', 'May the best player win'));

    } catch (err) {

      console.log(err);
      dispatch(errorNotification('Game Not Started', err.response.data));

    }

  }
}

export const UPDATE_GAME = 'UPDATE_GAME';
export function updateGame(game) {

  return (dispatch, getState) => {
    const userId = getState().user._id;

    return dispatch({
      type: UPDATE_GAME,
      payload: {
        data: game
      },
      userId
    });

  }
}

export const REMATCH = 'REMATCH';
export function rematch() {

  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.user._id;
    const gameId = state.game._id;
    
    const request = await axios.post(`/presidents/${gameId}/rematch`);

    return dispatch({
      type: REMATCH,
      payload: request,
      userId
    });

  }
}
