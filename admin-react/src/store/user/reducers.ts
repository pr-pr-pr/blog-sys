import { UserState, UserActionTypes, UPDATE_USER_LIST } from './types';

const initState: UserState = {
  userList: {
    list: [],
    page: 1,
    limit: 10,
    total: 0
  }
};

export function userReducer(state = initState, action: UserActionTypes): UserState {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return { ...state, userList: action.payload };
    default:
      return state;
  }
}
