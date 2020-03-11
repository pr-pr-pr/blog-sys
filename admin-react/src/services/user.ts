import { GetInfoResultTypes } from './index';
import request from '../utils/request';
import { dateFormat } from '../utils/date';

export interface GetUserListParamTypes extends Pagination {
  mode?: 'all' | undefined;
  username?: string;
}

export interface GetUserListResultTypes {
  list: GetInfoResultTypes[];
  page: number;
  limit: number;
  total: number;
}

export async function getUserListService(params?: GetUserListParamTypes): Promise<GetUserListResultTypes> {
  const res: GetUserListResultTypes = await request.get('/users', { params });
  return {
    list: res.list.map((i: GetInfoResultTypes) => ({
      isAdmin: i.isAdmin,
      id: i.id,
      username: i.username,
      avatar: i.avatar,
      summary: i.summary,
      createdAt: dateFormat(i.createdAt),
      updatedAt: dateFormat(i.updatedAt)
    })),
    page: res.page,
    limit: res.limit,
    total: res.total
  };
}

export interface AddUserService {
  username: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  summary?: string;
}

export async function addUserService(params: AddUserService) {
  await request.post('/users', params);
}
