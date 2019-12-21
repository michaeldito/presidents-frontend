import axios from '../../config/axios';
import { CREATE_GAME } from '../../actions/constants'
import { getUser, successNotification, errorNotification } from '../../actions';

const _createGame = async payload => {
  const request = await axios.post(`/presidents/create`, payload);

  return {
    type: CREATE_GAME,
    payload: request
  }
}

export const createGame = payload => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().user._id;
      await dispatch(_createGame(payload));
      await dispatch(getUser(userId));
      dispatch(successNotification('Game Created', 'Great success!'))
    } catch (err) {
      dispatch(errorNotification('Unable to create the game', err.response.data));
    }
  }
}