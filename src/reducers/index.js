import { combineReducers } from 'redux';
import gameReducer from './game';
import userReducer from './user';
import statsReducer from './stats';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  stats: statsReducer,
});

export default rootReducer;