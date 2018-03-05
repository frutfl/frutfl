import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';
import {Router} from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

// establishes socket connection
import './socket';

ReactDOM.render(
  <StripeProvider apiKey="pk_test_xqmuLiiaNAtFVqGIl0tcc8sn">
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  </StripeProvider>,
  document.getElementById('app')
);
