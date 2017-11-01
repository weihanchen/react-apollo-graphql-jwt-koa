'use strict';
import passport from 'koa-passport';
import compose from 'koa-compose';

// Strategies
import jwtStrategy from './strategies/jwt';

import { ExpireTokenModel } from '../data/token/model';
import errorBuilder  from '../services/error';

passport.use('jwt', jwtStrategy);

const authInitialize = () => compose([
   passport.initialize(),
]);

const authJwt = () => passport.authenticate("jwt", {
   session: false
});

const getToken = (headers) => {
	if (headers && headers.authorization) return headers.authorization;
	return null;
};

const vertifyToken = async (ctx, next) => {
   try {
      const token = getToken(ctx.req.headers);
      const result = await ExpireTokenModel.findOne({token});
      if (result) throw errorBuilder.unauthorized('Access token has expired');
      await next();
   } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = error;
   }
};

export default {
   authInitialize,
   authJwt,
   vertifyToken
};

export {
   authInitialize,
   authJwt,
   vertifyToken
};
