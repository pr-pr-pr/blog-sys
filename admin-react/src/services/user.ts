import { UserListState } from '../store/user/types';
import request from '../utils/request';

export interface GetUserListParams extends Pagination {
  mode?: 'all' | undefined;
  username: string;
}

export async function getUserList(params: GetUserListParams) {
  const resp: UserListState = await request.get('/users', { params });
  return {
    list: resp.list,
    page: resp.page,
    limit: resp.limit,
    total: resp.total
  } as UserListState;
}
