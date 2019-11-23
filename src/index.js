import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './assets/cards/cards.css';
import { Provider } from 'react-redux';
import {store, persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // needed for redux chrom devtools

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
