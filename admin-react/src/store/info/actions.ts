import { InfoState, UPDATE_INFO, CLEAR_INFO } from './types';

export const updateInfo = (payload: InfoState) => ({ type: UPDATE_INFO, payload });

export const clearInfo = () => ({ type: CLEAR_INFO });
