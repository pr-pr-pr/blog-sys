import { GetInfoResultTypes } from './index';
import request from '../utils/request';
import { dateFormat } from '../utils/date';
import { paramsFilter } from '../utils/filters';

export interface GetUserListParamTypes extends CommonQueryParams {
  mode?: 'all' | undefined;
  username?: string;
}

export async function getUserListService(params?: GetUserListParamTypes): Promise<TableData<GetInfoResultTypes>> {
  const res: TableData<GetInfoResultTypes> = await request.get('users', { params: paramsFilter(params) });
  return {
    list: res.list.map(i => ({
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

export interface AddUserParamTypes {
  username: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  summary?: string;
}

export async function addUserService(params: AddUserParamTypes) {
  await request.post('users', params);
}
