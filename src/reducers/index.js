import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import search from './search';

const rootReducer = combineReducers({
  game,
  user,
  search 
});

export default rootReducer