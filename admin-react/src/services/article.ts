import { GetTagResultTypes } from './tag';
import request from '../utils/request';
import { paramsFilter } from '../utils/filters';
import { GetInfoResultTypes } from '.';
import { dateFormat } from '../utils/date';

export interface GetArticleListParamTypes extends CommonQueryParams {
  title?: string;
  tag?: string;
  author?: string;
}

interface GetArticleResponseTypes {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: GetTagResultTypes[];
  author: GetInfoResultTypes;
}

export interface GetArticleResultTypes {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  author: string;
}

export async function getArticleListService(
  params?: GetArticleListParamTypes
): Promise<TableData<GetArticleResultTypes>> {
  const res: TableData<GetArticleResponseTypes> = await request.get('articles', { params: paramsFilter(params) });
  return {
    list: res.list.map(i => ({
      id: i.id,
      title: i.title,
      summary: i.summary,
      content: i.content,
      createdAt: dateFormat(i.createdAt),
      updatedAt: dateFormat(i.updatedAt),
      tags: i.tags.map(j => j.name),
      author: i.author.username
    })),
    page: res.page,
    limit: res.limit,
    total: res.total
  };
}

export interface ArticleParamTypes {
  title: string;
  summary: string;
  content: string;
  tags: string[];
  author: string;
}

export async function addArticleService(params: ArticleParamTypes) {
  await request.post('articles', paramsFilter(params));
}

export interface GetArticleDetailResponseTypes {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: GetTagResultTypes[];
  author: string;
}

export async function getArticleDetailService(id: string): Promise<GetArticleResultTypes> {
  const res: GetArticleDetailResponseTypes = await request.get('articles/' + id);
  return {
    id: res.id,
    title: res.title,
    summary: res.summary,
    content: res.content,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
    tags: res.tags.map(i => i.id),
    author: res.author
  };
}

export async function updateArticleService(id: string, params: ArticleParamTypes) {
  await request.put('articles/' + id, paramsFilter(params));
}

export async function deleteArticleService(id: string) {
  await request.delete('articles/' + id);
}
