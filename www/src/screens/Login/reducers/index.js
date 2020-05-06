import { combineReducers } from 'redux';
import * as Action from '../actions';

const username = (prev = null, action) => {
  switch (action.type) {
    case Action.LOGOUT:
      return null;

    case Action.CHANGED:
      if (action.payload.username !== undefined) {
        return action.payload.username;
      }

      return prev;
    default:
      return prev;
  }
};

const accessToken = (prev = null, action) => {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return action.payload.accessToken;
    case Action.LOGIN_BEFORE:
    case Action.LOGOUT:
      return null;
    default:
      return prev;
  }
};

const isAuthenticated = (prev = false, action) => {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return true;
    case Action.LOGIN_BEFORE:
    case Action.LOGIN_FAILURE:
    case Action.LOGOUT:
      return false;
    default:
      return prev;
  }
};

const serverError = (prev = null, action) => {
  switch (action.type) {
    case Action.LOGIN_FAILURE:
      if (action.payload)
        if (action.payload.data)
          if (action.payload.data.detail)
            return action.payload.data.detail;

      return null;

    case Action.LOGIN_BEFORE:
    case Action.LOGIN_SUCCESS:
      return null;
    default:
      return prev;
  }
};


export default combineReducers({
  isAuthenticated,
  username,
  accessToken,
  serverError,
});

