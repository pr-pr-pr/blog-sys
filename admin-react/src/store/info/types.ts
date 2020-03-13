export interface InfoState {
  isAdmin: boolean;
  id: string;
  username: string;
  avatar: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export const UPDATE_INFO = 'UPDATE_INFO';
export const CLEAR_INFO = 'CLEAR_INFO';

interface UpdateUsernameAction {
  type: typeof UPDATE_INFO;
  payload: InfoState;
}

interface ClearInfoAction {
  type: typeof CLEAR_INFO;
}

export type InfoActionTypes = UpdateUsernameAction | ClearInfoAction;
