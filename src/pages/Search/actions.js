import { getUser, successNotification, errorNotification } from '../../actions'
import { JOIN_GAME, GET_GAME } from '../../actions/constants'
import axios from '../../config/axios';

const _joinGame = async (id, payload, userId) => {
  const request = await axios.put(`/presidents/${id}/join`, payload);
  return {
    type: JOIN_GAME,
    payload: request,
    userId
  }
}

export const joinGame = id => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().user._id;
      const payload = { userId };
      await dispatch(_joinGame(id, payload, userId));
      await dispatch(getUser(userId));
      dispatch(successNotification('You have joined the game', 'Great success!'))
    }
    catch (err) {
      dispatch(errorNotification('Unable to join the game', err.response.data));
    }

  }
}


const _getGame = async (id, userId) => {
  const request = await axios.get(`presidents/${id}`);

  return {
    type: GET_GAME,
    payload: request,
    userId
  }
}

export const getGame = id => {
  return async (dispatch, getState) => {
    const userId = getState().user._id;
    try {
      await dispatch(_getGame(id, userId));
    }
    catch (err) {
      dispatch(errorNotification('Unable to fetch the game.', err.response.data));
    }
  }
}