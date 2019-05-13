import { deepCopy } from '../../utils';

export default function gameReducer(state = {}, action) {
  if (action.type === 'CREATE_GAME') {
    const game = action.payload.data;
    const newState = Object.assign({}, game);
    return newState;
  } else if (action.type === 'UPDATE_GAME') {
    const game = action.payload.data;
    const newState = deepCopy(game);
    return newState;
  } else if (action.type === 'GET_GAMES_TO_JOIN') {
    const gameNames = action.payload.data;
    let newState = deepCopy(state);
    newState.gamesToJoin = gameNames;
    return newState;
  }

  return state;
}