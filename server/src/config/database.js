const options = {
    jwt: {
        secret: process.env.SECRET_KEY || 'user_auth_demo'
    },
    mongo: {
        uri: process.env.MONGO_CONNECTION || 'mongodb://travis:test@127.0.0.1:27017/user_auth_demo'
    }
};


export default options;