/*
 *
 * Users actions
 *
 */

import {
  CREATE_USER,
  DEFAULT_ACTION,
  DELETE_USER,
  UPDATE_USER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

export function updateUser(id, user) {
  return {
    type: UPDATE_USER,
    user,
    id,
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_USER,
    id,
  };
}
