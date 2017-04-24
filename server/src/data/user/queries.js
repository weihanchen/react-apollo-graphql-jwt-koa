import {
    GraphQLID,
    GraphQLNonNull
} from 'graphql';
import {UserType, UserModel} from './models';

const User = {
    type: UserType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        return UserModel
            .findById(params.id)
            .exec();  // return JSON
    }
};

export default {
    User
};
