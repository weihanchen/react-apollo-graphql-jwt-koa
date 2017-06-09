import { ExpireTokenType, ExpireTokenModel } from '../token/model';

const Logout = {
   type: ExpireTokenType,
   description: 'Trigger logout action',
   args: {},
   resolve(root, params, context) {
      const token = context.headers.authorization;
      const expireAt = context.user.expireAt;
      const expireToken = new ExpireTokenModel({
         token,
         expireAt
      });
      return expireToken.save();
   }
};

const mutations = {
   Logout
};

export default mutations;