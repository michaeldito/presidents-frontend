import { deepCopy } from '../../utils';

export default function gameReducer(state = {}, action) {
  if (action.type === 'CREATE_GAME') {
    const game = action.payload.data;
    let newState = Object.assign({}, game);
    newState.wasGameCreated = true;
    return newState;

  } else if (action.type === 'JOIN_GAME') {
    try {
      let game = action.payload.data;
      console.log(`[reducers:game.JOIN_GAME] game: ${JSON.stringify(game, null, 2)}`)
  
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
      console.log(`[reducers:game.JOIN_GAME] user: ${JSON.stringify(state.user, null, 2)}`)
      let userId = state.user._id;
      let player = game.players.find(player => player.user._id === userId);
      const playersHand = player.hand;
  
      game.status = game.status.value;
      return {
        ...game,
        cardBoardCards,
        playersHand
      };
    } catch(err) { 
      console.log(err)
    }


  } else if (action.type === 'GET_GAME') {
    let game = action.payload.data;
    const { userId } = action;

    console.log(`[reducers:game.GET_GAME] players: ${JSON.stringify(game.players, null, 2)}`)
    console.log(`[reducers:game.GET_GAME] userId: ${userId}`)

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

  } else if (action.type === 'GET_GAMES_TO_JOIN') {

    const data = action.payload.data;
    let newState = deepCopy(state);
    newState.allGameData = data;
    return newState;
  }

  return state;
}