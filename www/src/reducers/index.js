import { combineReducers } from 'redux';

import Notes from '../screens/Notes/reducers';
import Login from '../screens/Login/reducers';

export default () =>
  combineReducers({
    Login,
    Notes,
  });