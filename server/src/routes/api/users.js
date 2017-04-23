'use strict';

import {User} from '../../models';
import {auth} from '../../auth';
import errorBuilder from '../../services/error';

const me = async (ctx, next) => {
   try {
      const request = ctx.request
      const user = await User.findById(req.user.uid);
      const respbody = {
         uid: req.user.id,
         username: user.username,
         displayname: user.displayName
      }
      ctx.body = respbody;
   } catch (error) {
      next(errorBuilder.internalServerError(error))
   }
};

const register = async (ctx, next) => {
   const { username, displayName, password } = ctx.request.body;
   //TODO: validtion body
   const user = await User.findOne({ username });
   if (user) {
      ctx.error = errorBuilder.badRequest('username already exist.');
      await next();
   } else {
      const user = new User({
         username,
         displayName,
         password
      });
      await user.save();
   }
};

export default (router) => {
   router.get('/user/me', auth(), me);
   router.post('/users', register)
};
