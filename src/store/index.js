import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './../reducers';
import socket from 'socket.io-client'

const middleware = [promise, createLogger(), thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
  rootReducer, 
  enhancer
);

// SOCKET

const io = socket('http://localhost:8080');

const addSocketListeners = (dispatch, getState) => {
	io.on('game refresh', data => {
		console.log(`[socket.io-client] game refresh`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);

		let userId = getState().user._id;

		dispatch({
			type: 'UPDATE_GAME',
			payload: {
				data: {...data.game}
			},
			userId
		});
	});
	
	io.on('drink given', data => {

		console.log(`[socket.io-client] drink given`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);

		let userId = getState().user._id;

		dispatch({
			type: 'UPDATE_GAME',
			payload: {
				data: {...data.game}
			},
			userId
		});
	});
	
	io.on('drink drunk', data => {

		console.log(`[socket.io-client] drink drunk`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);

		let userId = getState().user._id;

		dispatch({
			type: 'UPDATE_GAME',
			payload: {
				data: {...data.game}
			},
			userId
		});
	});
	
	io.on('rematch started', data => {

		console.log(`[socket.io-client] rematch started`);
		console.log(`[socket.io-client] data`);
		console.log(`[socket.io-client] ${data}`);

		let userId = getState().user._id;

		dispatch({
			type: 'UPDATE_GAME',
			payload: {
				data: {...data.game}
			},
			userId
		});
  });
}

addSocketListeners(store.dispatch, store.getState);

export default store;