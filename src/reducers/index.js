import { combineReducers } from 'redux';
import gameReducer from './game';
import userReducer from './user';
import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  loadingBar: loadingBarReducer
});

export default rootReducer