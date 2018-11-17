import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the users state domain
 */

const selectUsersDomain = state => state.get('users', initialState);

const makeSelectUserList = () =>
  createSelector(selectUsersDomain, substate =>
    substate.getIn(['user', 'data']),
  );

export { selectUsersDomain, makeSelectUserList };
