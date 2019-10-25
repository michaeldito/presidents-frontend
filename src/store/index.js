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

const io = socket('http://localhost:8080');

function addSocketListeners(dispatch, getState) {
	io.on('game refresh', data => {

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