export const SERVER_HOST = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/' : '';

export const tableDataDefault: TableData = {
  list: [],
  page: 1,
  limit: 10,
  total: 0
};

export const paginationConfig = (tableData: TableData) => ({
  current: tableData.page,
  pageSize: tableData.limit,
  total: tableData.total,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (total: number, range: [number, number]) => `第 ${range[0]} / ${range[1]} 页，共 ${total} 条数据`
});
