import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import search from './search';
import admin from './admin';

const rootReducer = combineReducers({
  game,
  user,
  search,
  admin
});

export default rootReducer