import {
   createStore,
   applyMiddleware,
   compose 
} from 'redux';
import rootReducers from '../reducers';

export default function configureStore(initialState = {}, apolloClient) {
    const store = createStore(
        rootReducers(apolloClient),
        initialState,
        compose(applyMiddleware(apolloClient.middleware()))
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