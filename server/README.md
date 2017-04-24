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

### Query user by id
```json
{
    User(id: "your user id") {
        username
        displayName
    }
}
```