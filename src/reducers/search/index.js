export default function searchReducer(state = {}, action) {
  if (action.type === 'GET_GAMES_TO_JOIN') {
    console.log(action.payload.data)
    const gamesToJoin = action.payload.data;
    let newState = Object.assign({}, state);
    newState.gamesToJoin = gamesToJoin;
    return newState;
  } 
  else if (action.type === 'LOGOUT') {
    return {};
  }
  return state;
}