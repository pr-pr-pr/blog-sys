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

export async function getUserListService(params?: GetUserListParamTypes) {
  const resp: GetUserListResultTypes = await request.get('/users', { params });
  return {
    list: resp.list.map((i: any) => {
      return {
        isAdmin: i.isAdmin,
        id: i.id,
        username: i.username,
        avatar: i.avatar,
        summary: i.summary,
        createdAt: dateFormat(i.createdAt),
        updatedAt: dateFormat(i.updatedAt)
      };
    }),
    page: resp.page,
    limit: resp.limit,
    total: resp.total
  } as GetUserListResultTypes;
}
