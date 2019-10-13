import { combineReducers } from 'redux';
import gameReducer from './game';
import userReducer from './user';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer
});

export default rootReducer;