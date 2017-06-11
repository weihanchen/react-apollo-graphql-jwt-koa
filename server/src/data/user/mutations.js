import {
   GraphQLID,
   GraphQLNonNull,
   GraphQLString
} from 'graphql';
import { ExpireTokenType, ExpireTokenModel } from '../token/model';
import {UserType, UserModel} from './model';

const logout = {
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

const updateUser = {
   type: UserType,
   description: 'Trigger update user action',
   args: {
      id: {
         name: 'id',
         type: new GraphQLNonNull(GraphQLID)
      },
      username: {
         name: 'username',
         type: new GraphQLNonNull(GraphQLString)
      },
      displayName: {
         name: 'displayName',
         type: new GraphQLNonNull(GraphQLString)
      }
   },
   resolve(root, params) {
      const { id, username, displayName } = params;
      const updateBody = { id, username, displayName };
      return UserModel.findOneAndUpdate(
         { _id: id },
         { $set: updateBody},
         { returnNewDocument: true }
      ).exec();
   }
};

const mutations = {
   logout,
   updateUser
};

export default mutations;