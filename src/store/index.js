import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./../reducers";
import socket from "socket.io-client";
import { getUser, infoNotification } from "../actions";
import { updateGame } from "../pages/Game/actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// SOCKET
let baseURL = "http://larry-presidents.herokuapp.com";
// baseURL = "http://localhost:8080";
let io = socket(baseURL);

// PERSIST
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [promise, thunk, createLogger()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

// CREATE STORE
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

// SOCKET HANDLERS
const { dispatch, getState } = store;
io.on("game refresh", data => {
  let state = getState();
  const userId = state.user._id;
  dispatch(updateGame(data.game));
  state = getState();
  const { currentPlayer } = state.game;
  if (currentPlayer === userId) {
    dispatch(infoNotification("It's your turn", "Good luck"));
  }
});

io.on("drink given", data => {
  dispatch(updateGame(data.game));
});

io.on("drink drunk", data => {
  dispatch(updateGame(data.game));
});

io.on("rematch started", async data => {
  let userId = getState().user._id;
  dispatch(updateGame(data.game));
  dispatch(getUser(userId));
});

io.on("game join", data => {
  dispatch(updateGame(data.game));
});
