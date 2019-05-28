import gameReducer from './';

describe.skip('user reducer', () => {

  it('returns initial state', () => {
    expect(gameReducer(undefined, {})).toEqual({});
  });

  it('create game', () => {
    const beforeState = {};
    const response = {};
    const action = {type: "CREATE_GAME", payload: response};
    const afterState = gameReducer(beforeState, action);
  });

  it('join game', () => {
    const beforeState = {};
    const response = {};
    const action = {type: "JOIN_GAME", payload: response};
    const afterState = gameReducer(beforeState, action);
  });


  it('get games to join', () => {
    const beforeState = {};
    const response = {};
    const action = {type: "GET_GAMES_TO_JOIN", payload: response};
    const afterState = gameReducer(beforeState, action);
  });

});