import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import schema from '../../data/schema';
import { authJwt } from '../../auth';

export default (router) => {
   router.post('/graphql', authJwt(), graphqlKoa(ctx => {
      return {
         schema,
         context: {
            user: ctx.req.user,
            headers: ctx.req.headers
         }
      };
   }));
   router.get('/graphql', graphqlKoa({ schema: schema }));
   // Tool for test your queries: localhost:3000/graphiql
   router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
};