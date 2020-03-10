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

interface UpdateUsernameAction {
  type: typeof UPDATE_INFO;
  payload: InfoState;
}

export type InfoActionTypes = UpdateUsernameAction;
