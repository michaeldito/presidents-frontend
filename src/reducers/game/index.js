import { deepCopy } from '../../utils';

function computedState(game, userId) {
  // cardBoardCards = [all cards played by players marked + all unplayed cards unmarked]
  let cardBoardCards = []
  for (let player of game.players) {
    for (let card of player.hand) {
      cardBoardCards.push({...card, played: true});
    }
  }
  for (let card of game.config.deck) {
    let hasCardBeenPlayed = cardBoardCards.find(cp => cp.shortHand === card.shortHand);
    if (! hasCardBeenPlayed) {
      cardBoardCards.push({...card, played: false});
    }
  }

  // playersHand = [all cards in the players hand]
  let player = game.players.find(player => player.user._id === userId);
  const playersHand = player.hand;

  game.status = game.status.value;

  return {
    ...game,
    cardBoardCards,
    playersHand
  };
}

export default function gameReducer(state = {}, action) {
  if (action.type === 'CREATE_GAME') {
    const game = action.payload.data;
    let newState = Object.assign({}, game);
    newState.wasGameCreated = true;
    return newState;

  } else if (action.type === 'JOIN_GAME') {

    let game = action.payload.data;
    let newState = Object.assign({}, game);
    return newState;


  } else if (action.type === 'GET_GAME') {

    let game = action.payload.data;
    const { userId } = action;
    return computedState(game, userId)

  } else if (action.type === 'GET_GAMES_TO_JOIN') {

    const data = action.payload.data;
    let newState = deepCopy(state);
    newState.allGameData = data;
    return newState;

  } else if (action.type === 'START_GAME') {

    let game = action.payload.data;
    const { userId } = action;
    return computedState(game, userId)
    
  } else if (action.type === 'PLAY_CARDS') {

    let game = action.payload.data;
    const { userId } = action;
    return computedState(game, userId)
  }
  return state;
}