import {
   GraphQLID,
   GraphQLNonNull
} from 'graphql';
import { UserType, UserModel } from './model';

const Me = {
   type: UserType,
   description: 'Represent the type of a authorized user',
   args: {

   },
   resolve(root, params, context) {
      return UserModel
         .findById(context.user.uid)
         .exec();  // return JSON
   }
};

const User = {
   type: UserType,
   description: 'Represent the type of a user by id',
   args: {
      id: {
         name: 'id',
         type: new GraphQLNonNull(GraphQLID)
      }
   },
   resolve(root, params) {
      return UserModel
         .findById(params.id)
         .exec();  // return JSON
   }
};

const queries = {
   User,
   Me
};


export default queries;
