import { UserListState, User } from '../store/user/types';
import request from '../utils/request';
import { dateFormat } from '../utils/date';

export interface GetUserListParams extends Pagination {
  mode?: 'all' | undefined;
  username?: string;
}

export async function getUserList(params?: GetUserListParams) {
  const resp: UserListState = await request.get('/users', { params });
  return {
    list: resp.list.map(i => {
      return {
        isAdmin: i.isAdmin,
        id: i.id,
        username: i.username,
        avatar: i.avatar,
        summary: i.summary,
        createdAt: dateFormat(i.createdAt),
        updatedAt: dateFormat(i.updatedAt)
      } as User;
    }),
    page: resp.page,
    limit: resp.limit,
    total: resp.total
  } as UserListState;
}
