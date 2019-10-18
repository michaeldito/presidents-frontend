import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './assets/cards/cards.css';
import { Provider } from 'react-redux';
import store from './store'

import * as serviceWorker from './serviceWorker';


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // needed for redux chrom devtools

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
