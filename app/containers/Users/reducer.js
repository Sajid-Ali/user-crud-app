/*
 *
 * Users reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_USER,
  DEFAULT_ACTION,
  DELETE_USER,
  UPDATE_USER,
} from './constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
  user: { loading: false, data: [] },
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CREATE_USER:
      return state.updateIn(['user', 'data'], data =>
        data.push({ ...action.user, key: guid() }),
      );

    case UPDATE_USER: {
      const index = state
        .getIn(['user', 'data'])
        .findIndex(row => row.key === action.id);
      return state.updateIn(['user', 'data', index], () => action.values);
    }

    case DELETE_USER: {
      const index = state
        .getIn(['user', 'data'])
        .findIndex(row => row.key === action.id);
      return state.deleteIn(['user', 'data', index]);
    }

    default:
      return state;
  }
}

export default usersReducer;
