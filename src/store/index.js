import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './../reducers';
import socket from 'socket.io-client'
import { getUser } from '../actions';
import { _updateGame } from '../pages/Game/actions';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
const middleware = [promise, createLogger(), thunk, loadingBarMiddleware()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)

// SOCKET
// const env = process.env.NODE_ENV;
// let io, baseURL;
// if (env === 'prod') {
// 	baseURL = 'https://larry-presidents.herokuapp.com';
// 	console.log('baseurl is larry prez')
// } else {
// 	console.log('baseurl is localhost')
//   baseURL = 'http://localhost:8080';
// }

let baseURL = 'https://larry-presidents.herokuapp.com';
let io = socket(baseURL);

const addSocketListeners = (dispatch, getState) => {
	io.on('game refresh', data => {
		console.log(`[socket.io-client] game refresh`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);
		let userId = getState().user._id;
		dispatch(_updateGame(data.game, userId));
	});
	
	io.on('drink given', data => {
		console.log(`[socket.io-client] drink given`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);
		let userId = getState().user._id;
		dispatch(_updateGame(data.game, userId));
	});
	
	io.on('drink drunk', data => {
		console.log(`[socket.io-client] drink drunk`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);
		let userId = getState().user._id;
		dispatch(_updateGame(data.game, userId));
	});
	
	io.on('rematch started', async data => {
		console.log(`[socket.io-client] rematch started`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);
		let userId = getState().user._id;
		dispatch(_updateGame(data.game, userId));
		dispatch(getUser(userId));
	});
	
	io.on('game join', data => {
		console.log(`[socket.io-client] game join`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);
		let userId = getState().user._id;
		dispatch(_updateGame(data.game, userId));
	})
}

addSocketListeners(store.dispatch, store.getState);

