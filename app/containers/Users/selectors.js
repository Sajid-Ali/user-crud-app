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

const makeSelectModalVisible = () =>
  createSelector(selectUsersDomain, substate =>
    substate.getIn(['modal', 'visible']),
  );

export { selectUsersDomain, makeSelectUserList, makeSelectModalVisible };
