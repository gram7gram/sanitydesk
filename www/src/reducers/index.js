import { combineReducers } from 'redux';

import Notes from '../screens/Notes/reducers';

export default () =>
  combineReducers({
    Notes,
  });