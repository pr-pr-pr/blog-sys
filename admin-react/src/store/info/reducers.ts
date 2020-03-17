import { InfoState, InfoActionTypes, UPDATE_INFO, CLEAR_INFO } from './types';

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
    case CLEAR_INFO:
      return initState;
    default:
      return state;
  }
}
