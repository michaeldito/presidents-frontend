export default function userReducer(state = {}, action) {
  if (action.type === 'LOGIN') {
    const user  = action.payload.data;
    let newState = Object.assign({}, user);
    newState.loggedIn = true;
    return newState;
  }
  else if (action.type === 'REGISTER') {
    const user  = action.payload.data;
    let newState = Object.assign({}, user);
    newState.loggedIn = true;
    return newState;
  } 
  else if (action.type === 'GET_USER') {
    const user  = action.payload.data;
    let newState = Object.assign({}, user);
    newState.loggedIn = true;
    return newState;
  }
  else if (action.type === 'LOGOUT') {
    return {};
  }
  return state;
}