import { GetUserListParams } from '../../services/user';
import { Action } from 'redux';
import { AppState } from '../index';
import { ThunkAction } from 'redux-thunk';
import { UserListState, UPDATE_USER_LIST, UPDATE_USER_LIST_LOADING } from './types';
import { getUserList } from '../../services/user';

const updateUserList = (payload: UserListState) => ({ type: UPDATE_USER_LIST, payload });
const updateUserListLoading = (payload: boolean) => ({ type: UPDATE_USER_LIST_LOADING, payload });

export const updateUserListAsync = (
  params?: GetUserListParams
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  dispatch(updateUserListLoading(true));
  const userList = await getUserList(params);
  dispatch(updateUserList(userList));
  dispatch(updateUserListLoading(false));
};
