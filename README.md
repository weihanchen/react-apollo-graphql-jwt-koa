# react-apollo-graphql-jwt-koa
Backend api with koa, mongo, jwt, apollo, graphql

Frontend with react, redux, redux-observable, apollo, graphql, nextjs

Refactor from [user-authentication-nodejs](https://github.com/weihanchen/user-authentication-nodejs)
## Requirement
- [Nodejs ^7.6.0](https://nodejs.org/en/)
- [Npm ^4.1.2](https://www.npmjs.com/package/npm)

## Stack
- [Koa](https://github.com/koajs/koa)
- [Mongoose](http://mongoosejs.com/)
- [Jwt](https://jwt.io/)
- [Apollo](http://dev.apollodata.com/react/)
- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/react-redux)
- [Redux-observable](https://github.com/redux-observable/redux-observable)
- [Graphql](http://graphql.org/learn/)
- [Next](https://github.com/zeit/next.js/)

## System Environment Variables
- `PORT`
- `SECRET_KEY`
- `MONGO_CONNECTION`

## Quick Start
```
git clone https://github.com/weihanchen/react-apollo-graphql-jwt-koa.git
```
## Install dependence packages
```
$ cd server 
$ npm install
$ cd ../client
$ npm install
```

## Step
### General config
- edit server/config/database.js or system variable for MONGO_CONNECTION、SECRET_KEY - database connection and jwt secret

### Pending
