Backend API with user authentication
---

## Quick Start
- `npm install`
- build /dist with `npm run build` or `yarn run build`
- development with `npm run dev` or `yarn run dev`
- production with `npm start` or `yarn start`

## Graphql tool
Tool for test your queries: `localhost:3000/graphiql`

## Documentation

### Step
>1. post `api/users` - create new account
>2. post `api/users/login` - login and get jwt token then frontend can store this token to use other api

### Query user by id
```json
{
    User(id: "your user id") {
        username
        displayName
    }
}
```