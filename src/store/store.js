
const ranks = ['2','3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'J', 'Q', 'K', 'A'];
const suites = ['H', 'D', 'C', 'S'];
const numPlayers = 4;

const createDeck = () => {
  let deck = [];
  for (let rank of ranks)
    for (let suite of suites)
      deck.push({rank, suite});
  return deck;
}

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const create2DArray = rows => {
  let A = [];
  for (let i = 0; i < rows; i++)
    A[i] = [];
  return A;
}

const deal = (numPlayers, shuffled) => {
  let players = create2DArray(numPlayers);
  let i = 0;
  while (shuffled.length > 0) {
    players[i].push(shuffled.pop());
    i = (i + 1) % numPlayers;
  }
  return players;
}

const intValue = card => {
  switch (card) {
    case '3': return 3;
    case '4': return 4;
    case '5': return 5;
    case '6': return 6;
    case '7': return 7;
    case '8': return 8;
    case '9': return 9;
    case '10': return 10;
    case 'J': return 11;
    case 'Q': return 12;
    case 'K': return 13;
    case 'A': return 14;
    case '2': return 15;
    default: return 0;
  }
}
const sortCards = (cards) => cards.sort((a, b) => (intValue(a.rank) > intValue(b.rank)) ? 1 : -1);

let playerHands = deal(numPlayers, shuffle(createDeck()));

playerHands.map(hand => sortCards(hand));

const find3Clubs = allPlayerHands => {
  let i = 0
  for (let player of allPlayerHands) {
    for (let card of player) {
      if (card.rank === '3' && card.suite === 'C')
        return i;
    }
    i += 1;
  }
  // shouldn't ever reach here
  return 0;
}

const nextPlayerIdx = (gameStatus, prevPlayerIdx, skipCount, numPlayers, allPlayerHands) => {
  if (gameStatus === 'NOT_STARTED')
    return find3Clubs(allPlayerHands);
  if (skipCount) 
    return (prevPlayerIdx + skipCount + 1) % numPlayers;
  else 
    return (prevPlayerIdx + 1) % numPlayers;
}

const playerNames = ['p1', 'p2', 'p3', 'p4'];

export default {
  game: {
    gamesToJoin: [],
    name: 'larry prez',
    status: 'NOT_STARTED', 
    playersOrder: playerNames,
    whoseTurnIdx: nextPlayerIdx('NOT_STARTED', 0, 0, numPlayers, playerHands),
    handToBeat: [],
    players: [
      {
        username: 'p1',
        hand: playerHands[0]
      },
      {
        username: 'p2',
        hand: playerHands[1]
      },
      {
        username: 'p3',
        hand: playerHands[2]
      },
      {
        username: 'p4',
        hand: playerHands[3]
      }
    ]
  },
  user: {
    username: 'dito',
    loggedIn: true,
    hand: []
  }
}