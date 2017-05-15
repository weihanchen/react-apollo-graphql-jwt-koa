import {
   createStore,
   applyMiddleware,
   compose
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducers from '../reducers';
import rootEpics from '../epics';
const epicMiddleware = createEpicMiddleware(rootEpics);

export default function configureStore(initialState = {}, apolloClient) {
  
   const store = createStore(
      rootReducers(apolloClient),
      initialState,
      compose(applyMiddleware(apolloClient.middleware(), epicMiddleware))
   );
   if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
         const nextReducer = require('../reducers')(apolloClient).default;
         store.replaceReducer(nextReducer);
      });
   }

   return store;
}