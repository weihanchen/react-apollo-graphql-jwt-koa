import React from 'react';
import {
   render
} from 'react-dom';
import {
	Router,
	browserHistory,
	hashHistory
} from 'react-router';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { GRAPHQL_ENDPOINT } from './config'
const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

const client = new ApolloClient({
  networkInterface
});