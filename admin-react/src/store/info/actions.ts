import { InfoState, UPDATE_INFO } from './types';

export const updateInfo = (payload: InfoState) => ({ type: UPDATE_INFO, payload });
