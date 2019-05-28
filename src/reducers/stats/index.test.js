import statsReducer from './';

describe('stats reducer', () => {

  it('returns initial state', () => {
    expect(statsReducer(undefined, {})).toEqual({});
  });

});