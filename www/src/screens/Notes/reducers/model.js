import { combineReducers } from 'redux';
import * as Action from '../actions';

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.TOGGLE_ADD_FORM:
      return null
    case Action.SAVE_SUCCESS:
      return action.payload.id;
    default:
      return prev;
  }
};

const createdAt = (prev = null, action) => {
  switch (action.type) {
    case Action.TOGGLE_ADD_FORM:
      return null
    case Action.SAVE_SUCCESS:
      return action.payload.createdAt;
    default:
      return prev;
  }
};

const title = (prev = null, action) => {
  switch (action.type) {
    case Action.TOGGLE_ADD_FORM:
      return null
    case Action.CHANGED:
      if (action.payload.title !== undefined)
        return action.payload.title;

      return prev;
    case Action.SAVE_SUCCESS:
      return action.payload.title;
    default:
      return prev;
  }
};

const text = (prev = null, action) => {
  switch (action.type) {
    case Action.TOGGLE_ADD_FORM:
      return null
    case Action.CHANGED:
      if (action.payload.text !== undefined)
        return action.payload.text;

      return prev;
    case Action.SAVE_SUCCESS:
      return action.payload.text;
    default:
      return prev;
  }
};

export default combineReducers({
  text,
  title,
  id,
  createdAt,
});

