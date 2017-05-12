import React from 'react';
import {
   render
} from 'react-dom';
import {
   Router,
   browserHistory,
   hashHistory
} from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { GRAPHQL_ENDPOINT } from './config';
import configureStore from './store/configureStore';
import routes from './routes.js';
const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

networkInterface.use([{
   applyMiddleware(req, next) {
      if (!req.options.headers) {
         req.options.headers = {};  // Create the header object if needed.
      }

      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
   },
}]);

const client = new ApolloClient({
   networkInterface
});
const store = configureStore(initialState, client);


render(
   <ApolloProvider client={client} store={store}>
      <Router routes={routes} history={hashHistory} />
   </ApolloProvider>,
	document.getElementById('root')
)