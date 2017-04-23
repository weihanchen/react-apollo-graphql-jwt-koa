import koa from 'koa';
import mongoose from 'mongoose';
import config from '../config';
import middleware from './middleware';
import {authInitialize} from './auth';
import routes from './routes';
mongoose.Promise = global.Promise;
console.log(config.mongo.uri)
mongoose.connect(config.mongo.uri);
const server = new koa(),
   PORT = process.env.PORT || 3000,
   errorHandler = (err, ctx) => {
       ctx.status = err.status || 500;
       ctx.body = err;
   };

server.use(middleware());
server.use(authInitialize());
server.use(routes());
server.use(errorHandler);

server.listen(PORT, () => console.log('Server is running on', 'localhost:' + PORT));
