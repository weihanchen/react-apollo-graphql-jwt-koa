import koa from 'koa';
import koaRouter from 'koa-router';
import cors from 'kcors';
import koaBody from 'koa-bodyparser';
import {graphqlKoa} from 'graphql-server-koa';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import {subscriptionManager} from  './data/subscriptions';
import schema from './data/schema';
import './db';
import {validateToken}from './auth';

const server = new koa(),
   router = new koaRouter(),
   PORT = process.env.PORT || 3000

server.use(cors());
server.use(koaBody());

router.post('/graphql', graphqlKoa({schema: schema}));

server.use(router.routes());
server.use(router.allowedMethods());

server.listen(PORT, () => console.log('Server is running on', 'localhost:' + PORT));

const subscriptionsServer = new SubscriptionServer({
        subscriptionManager: subscriptionManager,
        onConnect: async (connectionParams) => {
            if (connectionParams.authToken) {
                return await validateToken(connectionParams.authToken)
            }
            throw new Error('Missing auth token!')
        }
    }, {
        path: '/subscriptions',
        server: server
    }
)