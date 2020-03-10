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
}

export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

interface UpdateUserListAction {
  type: typeof UPDATE_USER_LIST;
  payload: UserListState;
}

export type UserActionTypes = UpdateUserListAction;
