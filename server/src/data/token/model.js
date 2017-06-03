import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {
   GraphQLObjectType,
   GraphQLNonNull,
   GraphQLString,
   GraphQLID
} from 'graphql';

const ExpireTokenSchema = new Schema({
	token: {
		type: String,
		unique: true,
		required: true
	},
	expireAt: {
		type: Date,
		required: true
	}
});

ExpireTokenSchema.index({
	expireAt: 1
}, {
	expireAfterSeconds: 0
});

export const ExpireTokenModel = mongoose.model('ExpireToken', ExpireTokenSchema);

export const ExpireTokenType = new GraphQLObjectType({
   name: "token",
   fields: {
      _id: {
         type: new GraphQLNonNull(GraphQLID)
      },
      token:{
         type: GraphQLString
      }
   }
});