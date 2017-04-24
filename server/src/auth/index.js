'use strict';
import passport from 'koa-passport';
import compose from 'koa-compose';

// Strategies
import jwtStrategy from './strategies/jwt';

passport.use('jwt', jwtStrategy);

const authInitialize = () => compose([
   passport.initialize(),
]);

const authJwt = () => passport.authenticate("jwt", {
   session: false
});

export default {
   authInitialize,
   authJwt
};

export {
   authInitialize,
   authJwt
};
