import userReducer from './';

describe('user reducer', () => {

  it('returns initial state', () => {
    expect(userReducer(undefined, {})).toEqual({});
  });

  it('sets username and loggedIn when logging in', () => {
    const beforeState = {};
    const action = {type: "LOGIN_USER", payload: { data: { username: 'loggy', loggedIn: true }}};
    const afterState = userReducer(beforeState, action);
    expect(afterState).toEqual({ username: 'loggy', loggedIn: true });
  });

  it('sets username and loggedIn when creating an account', () => {
    const beforeState = {};
    const action = {type: "CREATE_ACCOUNT", payload: { data: { username: 'loggy', loggedIn: true }}};
    const afterState = userReducer(beforeState, action);
    expect(afterState).toEqual({ username: 'loggy', loggedIn: true });
  });

});