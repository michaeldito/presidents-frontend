
import axios from '../../config/axios';
import { successNotification, errorNotification, infoNotification } from '../../actions';
import { PLAY_CARDS, PASS, GIVE_DRINK, DRINK_DRINK, START_GAME, UPDATE_GAME, REMATCH } from '../../actions/constants';

export const _playCard = async (id, payload, userId) => {
  const request = await axios.put(`presidents/${id}/processTurn`, payload);

  return { 
    type: PLAY_CARDS, 
    payload: request, 
    userId
  }
}

export const playCards = (id, cardsPlayed) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const user = state.user;
      const userId = user._id;
      const wasPassed = false;
      let payload = {user, cardsPlayed, wasPassed};
      await dispatch(_playCard(id, payload, userId));
      dispatch(successNotification('Turn Accepted', 'Nice.'));
    } catch (err) {
      dispatch(errorNotification('Invalid Turn', err.response.data));
    }
  }
}

export const _pass = async (id, payload) => {
  const request = await axios.put(`presidents/${id}/processTurn`, payload);

  return { 
    type: PASS, 
    payload: request
  }
}

export const pass = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { user } = state;
      const id = state.game._id;
      const wasPassed = true;
      const payload = { user, cardsPlayed: [], wasPassed };
      await dispatch(_pass(id, payload));
      dispatch(infoNotification('You passed', 'nothing to see here.'));
    } 
    catch (err) {
      dispatch(errorNotification('You can\'t pass', err.response.data));
    }
  }
}

export const _giveDrink = async (id, payload) => {
  const request = await axios.put(`presidents/${id}/giveDrink`, payload);

  return { 
    type: GIVE_DRINK, 
    payload: request
  }
}

export const giveDrink = toUser => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const fromUser = state.user._id;
      const id = state.game._id;
      const payload = { fromUser, toUser };
      await dispatch(_giveDrink(id, payload))
    } 
    catch (err) {
      dispatch(errorNotification('Drink not given', err.response.data))
    }
  }
}

export const _drinkDrink = async (id, payload) => {
  const request = await axios.put(`presidents/${id}/drinkDrink`, payload);

  return { 
    type: DRINK_DRINK, 
    payload: request
  }
}
export const drinkDrink = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userId = state.user._id;
      const id = state.game._id;
      const payload = { userId };
      await dispatch(_drinkDrink(id, payload));
      dispatch(successNotification('Drink Dranken', 'gulp gulp'));
    } 
    catch (err) {
      dispatch(errorNotification('Drink Not Dranken', 'no drink for you'));
    }
  }
}

export const _startGame = async (id, userId) => {
  const request = await axios.put(`/presidents/${id}/initialize`);

  return { 
    type: START_GAME, 
    payload: request,
    userId
  }
}

export const startGame = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.user._id;
    const id = state.game._id
    try {
      await dispatch(_startGame(id, userId));
      dispatch(successNotification('Game Started', 'May the best player win'));
    } 
    catch (err) {
      dispatch(errorNotification('Game Not Started', err.response.data));
    }
  }
}


export const _updateGame = (game, userId) => {
  return {
    type: UPDATE_GAME,
    payload: { data: game },
    userId
  }
}

export const updateGame = game => {
  return async (dispatch, getState) => {
    let state = getState();
    const userId = state.user._id;
    await dispatch(_updateGame(game, userId));
  }
}


export const _rematch = async (gameId, userId) => {
  const request = await axios.post(`/presidents/${gameId}/rematch`);

  return {
    type: REMATCH,
    payload: request,
    userId
  }
}
export const rematch = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.user._id;
    const gameId = state.game._id;
    await dispatch(_rematch(gameId, userId));
  }
}