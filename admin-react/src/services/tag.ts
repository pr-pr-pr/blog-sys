import request from '../utils/request';
import { paramsFilter } from '../utils/filters';

export interface GetTagListParamTypes extends CommonQueryParams {
  mode?: 'all' | undefined;
  name?: string;
}

export interface GetTagResultTypes {
  id: string;
  name: string;
  description: string;
}

export async function getTagListService(params?: GetTagListParamTypes): Promise<TableData<GetTagResultTypes>> {
  const res: TableData<GetTagResultTypes> = await request.get('tags', { params: paramsFilter(params) });
  return {
    list: res.list.map(i => ({
      id: i.id,
      name: i.name,
      description: i.description
    })),
    page: res.page,
    limit: res.limit,
    total: res.total
  };
}

export interface TagParamTypes {
  name: string;
  description?: string;
}

export async function addTagService(params: TagParamTypes) {
  await request.post('tags', paramsFilter(params));
}

export async function getTagDetailService(id: string): Promise<GetTagResultTypes> {
  const res: GetTagResultTypes = await request.get('tags/' + id);
  return {
    id: res.id,
    name: res.name,
    description: res.description
  };
}

export async function updateTagService(id: string, params: TagParamTypes) {
  await request.put('tags/' + id, paramsFilter(params));
}

export async function deleteTagService(id: string) {
  await request.delete('tags/' + id);
}
