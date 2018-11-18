/*
 *
 * Users reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  TOGGLE_MODAL,
  DEFAULT_ACTION,
} from './constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
  user: { loading: false, data: [] },
  modal: { visible: false },
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case TOGGLE_MODAL: {
      const visible = state.getIn(['modal', 'visible']);
      return state.setIn(['modal', 'visible'], !visible);
    }

    case CREATE_USER:
      return state
        .updateIn(['user', 'data'], data =>
          data.push({ ...action.user, key: guid() }),
        )
        .setIn(['modal', 'visible'], false);

    case UPDATE_USER: {
      const index = state
        .getIn(['user', 'data'])
        .findIndex(row => row.key === action.id);
      return state
        .updateIn(['user', 'data', index], () => action.user)
        .setIn(['modal', 'visible'], false);
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
