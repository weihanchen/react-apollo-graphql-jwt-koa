import React from 'react';
import {
   render
} from 'react-dom';
import {
  HashRouter as Router
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import 'rxjs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { GRAPHQL_ENDPOINT } from './config';
import configureStore from './store/configureStore';
import routes from './routes.js';
injectTapEventPlugin();
const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });
const initialState = window.__INITIAL_STATE__;
/* Stylesheets*/
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './stylesheets/style.scss';

networkInterface.use([{
   applyMiddleware(req, next) {
      if (!req.options.headers) {
         req.options.headers = {};  // Create the header object if needed.
      }

      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      if(token) req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
   },
}]);

const client = new ApolloClient({
   networkInterface
});
const store = configureStore(initialState, client);
const history = createBrowserHistory();

render(
   <ApolloProvider client={client} store={store}>
      <Router history={history}>
        {routes}
      </Router>
   </ApolloProvider>,
	document.getElementById('root')
)