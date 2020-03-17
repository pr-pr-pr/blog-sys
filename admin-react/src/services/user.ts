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

export interface UserParamTypes {
  username: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  summary?: string;
}

export async function addUserService(params: UserParamTypes) {
  await request.post('users', paramsFilter(params));
}

export async function getUserDetailService(id: string): Promise<GetInfoResultTypes> {
  const res: GetInfoResultTypes = await request.get('users/' + id);
  return {
    isAdmin: res.isAdmin,
    id: res.id,
    username: res.username,
    avatar: res.avatar,
    summary: res.summary,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt
  };
}

export async function updateUserService(id: string, params: UserParamTypes) {
  await request.put('users/' + id, paramsFilter(params));
}

export async function deleteUserService(id: string) {
  await request.delete('users/' + id);
}
