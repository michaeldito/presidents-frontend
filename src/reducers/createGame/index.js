export default function createGameReducer(state = {}, action) {
  if (action.type === "GET_CONFIG_NAMES") {
    let configs = action.payload.data.data;
    configs = configs.map(c => c.name);
    let newState = Object.assign({}, state);
    newState.configs = configs;
    return newState;
  } else if (action.type === "LOGOUT") {
    return {};
  }
  return state;
}
