export default function adminReducer(state = {}, action) {
  console.log('adminReducer')
  if (action.type === 'GET_INSTANCE_SET') {
    const instances  = action.payload.data;
    let newState = Object.assign({}, state);
    newState.instanceSet = instances;
    return newState;
  }
  else if (action.type === 'GET_INSTANCE') {
    const instance  = action.payload.data;
    let newState = Object.assign({}, state);
    newState.instance = instance;
    return newState;
  }
  else if (action.type === 'GET_SCHEMAS') {
    const instances  = action.payload.data;
    let newState = Object.assign({}, instances);
    return newState;
  }
  else if (action.type === 'LOGOUT') {
    return {};
  }
  return state;
}