import request from '../utils/request';
import { dateFormat } from '../utils/date';

export interface LoginParamTypes {
  username: string;
  password: string;
}

export async function loginService(params: LoginParamTypes) {
  const { token } = await request.post('/auth/login', params);
  localStorage.setItem('token', token);
}

export interface GetInfoResultTypes {
  isAdmin: boolean;
  id: string;
  username: string;
  avatar: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export async function getInfoService() {
  const resp: GetInfoResultTypes = await request.get('/auth/user');
  return {
    isAdmin: resp.isAdmin,
    id: resp.id,
    username: resp.username,
    avatar: resp.avatar,
    summary: resp.summary,
    createdAt: dateFormat(resp.createdAt),
    updatedAt: dateFormat(resp.updatedAt)
  } as GetInfoResultTypes;
}
