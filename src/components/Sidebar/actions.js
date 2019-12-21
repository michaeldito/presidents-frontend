import axios from '../../config/axios';
import { LOGOUT, GET_GAMES_TO_JOIN } from '../../actions/constants';

export const logout = () => {
  return {
    type: LOGOUT
  }
}
export const getGamesToJoin = () => {
  const request = axios.get(`/presidents`);

  return {
    type: GET_GAMES_TO_JOIN,
    payload: request
  }
}
