export default function gameReducer(state = {}, action) {
  if (action.type === 'CREATE_GAME') {
    const game = action.payload.data;
    let newState = Object.assign({}, game);
    newState.wasGameCreated = true;
    newState.selectedCards = [];
    return newState;
  } 
  else if (action.type === 'JOIN_GAME') {
    let game = action.payload.data;
    let newState = Object.assign({}, game);
    newState.selectedCards = [];
    return newState;
  } 
  else if (action.type === 'GET_GAME') {
    let game = action.payload.data;
    game.selectedCards = [];
    let newState = Object.assign({}, game);
    return newState;
  }
  else if (action.type === 'START_GAME') {
    let game = action.payload.data;
    game.selectedCards = [];
    let newState = Object.assign({}, game);
    return newState;
  } 
  else if (action.type === 'PLAY_CARDS') {
    let game = action.payload.data;
    let newState = Object.assign({}, game);
    return newState;
    } 
  else if (action.type === 'SELECT_CARD') {
    let newState = Object.assign({}, state);
    let { card } = action;
    let updatedSelectedCards = state.selectedCards.concat([card]);
    newState.selectedCards = updatedSelectedCards;
    return newState;
  } 
  else if (action.type === 'DESELECT_CARD') {
    let newState = Object.assign({}, state);
    let { card } = action;
    let updatedSelectedCards = state.selectedCards.filter(c => c.shortHand !== card.shortHand);
    newState.selectedCards = updatedSelectedCards;
    return newState;
  }
  else if (action.type === 'CLEAR_SELECTED_CARDS') {
    let newState = Object.assign({}, state);
    newState.selectedCards = [];
    return newState;
  }
  else if (action.type === 'UPDATE_GAME') {
    let game = action.payload.data;
    game.selectedCards = state.selectedCards;
    let newState = Object.assign({}, game);
    return newState;
  }
  else if (action.type === 'REMATCH') {
    let game = action.payload.data;
    game.selectedCards = [];
    let newState = Object.assign({}, game);
    return newState;
  } 
  else if (action.type === 'LOGOUT') {
    return {};
  }

  return state;
}