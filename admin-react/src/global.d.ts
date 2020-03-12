declare interface Pagination {
  page?: number;
  limit?: number;
  sort?: number;
  sortKey?: string;
}

declare interface SortParams {
  sort?: -1 | 1;
  sortKey?: string;
}

declare interface AntdTableChange {
  (...args: any): void;
}

declare interface TableData<T = any> {
  list: T[];
  page: number;
  limit: number;
  total: number;
}
