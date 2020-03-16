/**
 * 列表接口公共参数类型（分页和排序）
 */
declare interface CommonQueryParams extends SortParams {
  page?: number;
  limit?: number;
  sort?: -1 | 1;
  sortKey?: string;
}

/**
 * 列表接口排序参数类型
 */
declare interface SortParams {
  sort?: -1 | 1;
  sortKey?: string;
}

/**
 * Antd 表格 onChange 事件方法类型
 */
declare interface AntdTableChange {
  (...args: any): void;
}

/**
 * 表格数据类型
 */
declare interface TableData<T = any> {
  list: T[];
  page: number;
  limit: number;
  total: number;
}

declare module 'markdown-it-emoji';
declare module 'markdown-it-sub';
declare module 'markdown-it-sup';
declare module 'markdown-it-footnote';
declare module 'markdown-it-deflist';
declare module 'markdown-it-abbr';
declare module 'markdown-it-ins';
declare module 'markdown-it-mark';
declare module 'markdown-it-task-lists';
