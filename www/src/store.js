import { applyMiddleware, compose, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import reducers from './reducers';

let middleware = [ promise, thunk ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let accessToken = Cookie.get('accessToken')

const initial = {
  Login: {
    isAuthenticated: !!accessToken,
    accessToken,
  }
};

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
