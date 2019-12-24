import { deepCopy } from '../../utils';

function computedState(game, userId) {
  // cardsRemaining = [all cards played by players marked + all unplayed cards unmarked]
  let cardsRemaining = []
  for (let player of game.players) {
    for (let card of player.hand) {
      cardsRemaining.push({...card, played: false});
    }
  }
  for (let card of game.config.deck) {
    let hasCardBeenPlayed = cardsRemaining.find(cp => cp.shortHand === card.shortHand);
    if (hasCardBeenPlayed) {
      cardsRemaining.push({...card, played: true});
    }
  }

  // playersHand = [all cards in the players hand]
  let player = game.players.find(player => player.user._id === userId);
  const playersHand = player.hand;

  // game.status = game.status.value;

  return {
    ...game,
    cardsRemaining,
    playersHand
  };
}

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
    const { userId } = action;
    return computedState(game, userId)
  } 
  else if (action.type === 'GET_GAMES_TO_JOIN') {
    const data = action.payload.data;
    let newState = deepCopy(state);
    newState.allGameData = data;
    return newState;
  } 
  else if (action.type === 'START_GAME') {
    let game = action.payload.data;
    const { userId } = action;
    game.selectedCards = [];
    return computedState(game, userId)
  } 
  else if (action.type === 'PLAY_CARDS') {
    let game = action.payload.data;
    const { userId } = action;
    return computedState(game, userId)
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
    const { userId } = action;
    return computedState(game, userId)
  }
  else if (action.type === 'REMATCH') {

    let game = action.payload.data;
    const { userId } = action;
    game.selectedCards = [];
    return computedState(game, userId)
  }

  return state;
}