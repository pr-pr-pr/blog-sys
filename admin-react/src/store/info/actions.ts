import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loginService, getUserInfoService } from '../../services';
import { AppState } from '../index';
import { InfoState, UPDATE_INFO } from './types';

const updateInfo = (payload: InfoState) => ({ type: UPDATE_INFO, payload });

export const loginAsync = (
  username: string,
  password: string
): ThunkAction<void, AppState, null, Action> => async () => {
  await loginService(username, password);
};

export const updateUserInfoAsync = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const info = await getUserInfoService();
  dispatch(updateInfo(info));
};
