export default function userReducer(state = {}, action) {
  if (action.type === 'LOGIN') {
    const user  = action.payload.data;
    let newState = Object.assign({}, user);
    return newState;
  }
  else if (action.type === 'REGISTER') {
    const user  = action.payload.data;
    let newState = Object.assign({}, user);
    return newState;
  }
  return state;
}