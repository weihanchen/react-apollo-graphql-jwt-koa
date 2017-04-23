'use strict';
import passport from 'koa-passport';
import compose from 'koa-compose';

// Strategies
import jwtStrategy from './strategies/jwt';

passport.use('jwt', jwtStrategy);

const authInitialize = () => compose([
   passport.initialize(),
]);

const auth = () => passport.authenticate("jwt", {
   session: false
});

export default {
   authInitialize,
   auth
};

export {
   authInitialize,
   auth
};
