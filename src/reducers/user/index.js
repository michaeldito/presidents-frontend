export default function userReducer(state = {}, action) {
  if (action.type === 'LOGIN_USER') {
    const { username, loggedIn }  = action.payload.data;
    let newState = Object.assign({}, { username, loggedIn });
    return newState;
  }
  else if (action.type === 'CREATE_ACCOUNT') {
    const { username, loggedIn }  = action.payload.data;
    let newState = Object.assign({}, { username, loggedIn });
    return newState;
  }
  return state;
}