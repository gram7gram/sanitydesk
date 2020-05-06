import { applyMiddleware, compose, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from './reducers';

let middleware = [ promise, thunk ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initial = {};

export default () => {

  const store = createStore(
    reducers(),
    initial,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  return store;
}
