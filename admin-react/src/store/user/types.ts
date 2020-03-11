export interface User {
  isAdmin: boolean;
  id: string;
  username: string;
  avatar: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserListState {
  list: User[];
  page: number;
  limit: number;
  total: number;
}

export interface UserState {
  userList: UserListState;
  loading: boolean;
}

export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';
export const UPDATE_USER_LIST_LOADING = 'UPDATE_USER_LIST_LOADING';

interface UpdateUserListAction {
  type: typeof UPDATE_USER_LIST;
  payload: UserListState;
}

interface UpdateUserListLoadingAction {
  type: typeof UPDATE_USER_LIST_LOADING;
  payload: boolean;
}

export type UserActionTypes = UpdateUserListAction | UpdateUserListLoadingAction;
