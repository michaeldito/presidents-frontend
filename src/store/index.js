import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger'
import rootReducer from './../reducers';
import state from './store';

const middleware = [promiseMiddleware, createLogger()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
  rootReducer, 
  state,
  enhancer
);

export default store;