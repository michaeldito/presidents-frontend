import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from './../reducers';

const middleware = [promise, createLogger(), thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
  rootReducer, 
  enhancer
);

export default store;