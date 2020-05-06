import { combineReducers } from 'redux';
import * as Action from '../actions';
import model from './model';

const items = (prev = [], action) => {
  switch (action.type) {
    case Action.CHANGED:
      return prev.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item, ...action.payload
          };
        }

        return item;
      });

    case Action.SAVE_SUCCESS:
      const state = [...prev]

      state.push(action.payload)

      return state

    case Action.REMOVE_SUCCESS:
      return prev.filter(item => item.id !== action.payload.id);

    case Action.FETCH_SUCCESS:
      return action.payload.items;
    default:
      return prev;
  }
};

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.FETCH_FAILURE:
    case Action.FETCH_SUCCESS:
      return false;
    case Action.FETCH_BEFORE:
      return true;
    default:
      return prev;
  }
};

const isSaving = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_FAILURE:
    case Action.REMOVE_FAILURE:
    case Action.SAVE_SUCCESS:
    case Action.REMOVE_SUCCESS:
      return false;
    case Action.SAVE_BEFORE:
    case Action.REMOVE_BEFORE:
      return true;
    default:
      return prev;
  }
};

const isAddVisible = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return false
    case Action.TOGGLE_ADD_FORM:
      return !!action.payload;
    default:
      return prev;
  }
};

export default combineReducers({
  items,
  isLoading,
  isAddVisible,
  isSaving,
  model,
});

