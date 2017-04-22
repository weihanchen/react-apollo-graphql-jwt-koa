'use strict';
const badRequest = (message) => ({
    message: message || 'bad request',
    status: 400
});

const unauthorized = (message) => ({
    message: message || 'unauthorized',
    status: 401
});

const notFound = (message) => ({
    message: message || 'not found',
    status: 404
});

const internalServerError = (message) => ({
    message: message || 'Internal server error',
    status: 500
});

const errorBuilder = {
    badRequest,
    unauthorized,
    notFound,
    internalServerError
};

export default errorBuilder;