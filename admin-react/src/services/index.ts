import request from '../utils/request';
import { dateFormat } from '../utils/date';
import { paramsFilter } from '../utils/filters';

export interface LoginParamTypes {
  username: string;
  password: string;
}

export async function loginService(params: LoginParamTypes) {
  const { token } = await request.post('auth/login', paramsFilter(params));
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

export async function getInfoService(): Promise<GetInfoResultTypes> {
  const res: GetInfoResultTypes = await request.get('auth/user');
  return {
    isAdmin: res.isAdmin,
    id: res.id,
    username: res.username,
    avatar: res.avatar,
    summary: res.summary,
    createdAt: dateFormat(res.createdAt),
    updatedAt: dateFormat(res.updatedAt)
  };
}

export async function uploadService(file: any) {
  const fd = new FormData();
  fd.append('file', file);
  const res: { path: string } = await request.post('upload', fd);
  return res.path;
}
