import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';
import schema from '../../data/schema';

export default (router) => {
    router.post('/graphql', graphqlKoa({schema: schema}));
    router.get('/graphql', graphqlKoa({schema: schema}));
    // Tool for test your queries: localhost:3000/graphiql
    router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));
};