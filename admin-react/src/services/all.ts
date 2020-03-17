import request from '../utils/request';

export interface GetAllUserResultTypes {
  id: string;
  username: string;
}

export async function getAllUserService(): Promise<GetAllUserResultTypes[]> {
  const res: GetAllUserResultTypes[] = await request.get('users', { params: { mode: 'all' } });
  return res.map(i => ({
    id: i.id,
    username: i.username
  }));
}

export interface GetAllTagResultTypes {
  id: string;
  name: string;
}

export async function getAllTagService(): Promise<GetAllTagResultTypes[]> {
  const res: GetAllTagResultTypes[] = await request.get('tags', { params: { mode: 'all' } });
  return res.map(i => ({
    id: i.id,
    name: i.name
  }));
}
