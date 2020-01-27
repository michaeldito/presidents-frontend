import { combineReducers } from "redux";
import game from "./game";
import user from "./user";
import search from "./search";
import admin from "./admin";
import createGame from "./createGame";
import dashboard from "./dashboard";

const rootReducer = combineReducers({
  game,
  user,
  search,
  admin,
  createGame,
  dashboard
});

export default rootReducer;
