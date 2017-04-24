'use strict';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { UserModel } from '../../data/user/models';
import { authJwt } from '../../auth';
import errorBuilder from '../../services/error';

const login = async (ctx, next) => {
   try {
      const { username, password } = ctx.request.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
         ctx.error = errorBuilder.badRequest('User not found.');
         await next();
      } else {
         const isValid = user.validPassword(password);
         if (isValid) {
            const expires = moment().add(1, 'days').valueOf();
            const token = jwt.sign({
               iss: user.id,
               exp: expires
            }, config.jwt.secret);
            ctx.body = {
               success: true,
               uid: user.id,
               token: 'JWT ' + token
            }
         } else {
            ctx.error = errorBuilder.badRequest('Wrong password.');
            await next();
         }
      }
   } catch (error) {
      ctx.error = errorBuilder.internalServerError(error);
      await next();
   }
};

const me = async (ctx, next) => {
   try {
      const request = ctx.request
      const user = await UserModel.findById(req.user.uid);
      const respbody = {
         uid: req.user.id,
         username: user.username,
         displayname: user.displayName
      }
      ctx.body = respbody;
   } catch (error) {
      ctx.error = errorBuilder.internalServerError(error);
      await next();
   }
};

const register = async (ctx, next) => {
   const { username, displayName, password } = ctx.request.body;
   //TODO: validtion body
   const user = await UserModel.findOne({ username });
   if (user) {
      ctx.error = errorBuilder.badRequest('username already exist.');
      await next();
   } else {
      const user = new UserModel({
         username,
         displayName,
         password
      });
      await user.save();
      ctx.body = {
         success: true,
         message: 'Successful signup.'
      };
   }
};

export default (router) => {
   // router.get('/users/me', authJwt(), me);
   router.post('/users', register);
   router.post('/users/login', login);
};
