export default function userReducer(state = {}, action) {
  if (action.type === 'LOGIN_USER') {
    const user  = action.payload.data;
    console.log(user)
    let newState = Object.assign({}, { ...user });
    return newState;
  }
  else if (action.type === 'CREATE_ACCOUNT') {
    const user  = action.payload.data;
    let newState = Object.assign({}, { ...user });
    return newState;
  }
  return state;
}