'use strict';

import config from '../../config';
import errorBuilder from '../../services/error';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const params = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader() //creates a new extractor that looks for the JWT in the authorization header with the scheme 'JWT',e.g JWT + 'token'
};

export default new JWTStrategy(params, (payload, done) => {
    try {
        if (payload.exp <= Date.now()) {
            return done(errorBuilder.unauthorized('Access token has expired'), false);
        }
        const extracted = {
            uid: payload.iss,
            expireAt: payload.exp
        };
        done(null, extracted);
    } catch (error) {
        done(error);
    }
});
