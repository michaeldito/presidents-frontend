import { combineReducers } from "redux";
import game from "./game";
import user from "./user";
import search from "./search";
import admin from "./admin";
import createGame from "./createGame";

const rootReducer = combineReducers({
  game,
  user,
  search,
  admin,
  createGame
});

export default rootReducer;
