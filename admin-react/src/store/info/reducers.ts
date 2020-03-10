import { InfoState, InfoActionTypes, UPDATE_INFO } from './types';

const initState: InfoState = {
  isAdmin: false,
  id: '',
  username: '',
  avatar: '',
  summary: '',
  createdAt: '',
  updatedAt: ''
};

export function infoReducer(state = initState, action: InfoActionTypes): InfoState {
  switch (action.type) {
    case UPDATE_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
