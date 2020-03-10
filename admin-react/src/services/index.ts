import request from '../utils/request';
import { InfoState } from '../store/info/types';
import { dateFormat } from '../utils/date';

export async function loginService(username: string, password: string) {
  const { token } = await request.post('/auth/login', { username, password });
  localStorage.setItem('token', token);
  return username;
}

export async function getInfoService() {
  const resp: InfoState = await request.get('/auth/user');
  return {
    isAdmin: resp.isAdmin,
    id: resp.id,
    username: resp.username,
    avatar: resp.avatar,
    summary: resp.summary,
    createdAt: dateFormat(resp.createdAt),
    updatedAt: dateFormat(resp.updatedAt)
  } as InfoState;
}
