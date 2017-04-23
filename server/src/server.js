import koa from 'koa';
import mongoose from 'mongoose';
import config from '../config';
import middleware from './middleware';
import {authInitialize} from './auth';
import routes from './routes';
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);
const server = new koa(),
   PORT = process.env.PORT || 3000,
   errorHandler = (ctx) => {
       ctx.status = ctx.error.status || 500;
       ctx.body = ctx.error;
   };

server.use(middleware());
server.use(authInitialize());
server.use(routes());
server.use(errorHandler);

server.listen(PORT, () => console.log('Server is running on', 'localhost:' + PORT));
