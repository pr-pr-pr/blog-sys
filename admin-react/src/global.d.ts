declare interface Pagination {
  page?: number;
  limit?: number;
  sort?: number;
  sortKey?: string;
}

declare interface SortParams {
  sort?: -1 | 1;
  sortKey?: string = 'id';
}

declare interface AntdTableChange {
  (...args: any): void;
}
