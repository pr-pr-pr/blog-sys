import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Input, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { getUserListService, GetUserListResultTypes } from '../../services/user';
import { roleFilter } from '../../utils/filters';
import UserAdd from './UserAdd';

const UserList: React.FC = () => {
  const [tableData, setTableData] = useState<GetUserListResultTypes>({
    list: [],
    page: 1,
    limit: 10,
    total: 0
  });
  const [sortParams, setSortParams] = useState<SortParams>({});
  const [searchKey, setSearchKey] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    getUserListService({
      page: tableData.page,
      limit: tableData.limit,
      username: searchKey,
      ...sortParams
    }).then(res => setTableData(res));
  }, [tableData.page, tableData.limit, sortParams, searchKey]);

  const columns: ColumnsType<{}> = [
    { title: '用户名', dataIndex: 'username', width: 180, sorter: true },
    { title: '简介', dataIndex: 'summary' },
    { title: '角色', dataIndex: 'isAdmin', width: 80, sorter: true, render: roleFilter },
    { title: '创建时间', dataIndex: 'createdAt', width: 180, sorter: true },
    { title: '更新时间', dataIndex: 'updatedAt', width: 180, sorter: true }
  ];

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
  };

  const tableChange: AntdTableChange = (pagination, filters, { order, field }) => {
    // TODO: 分页
    // console.log(pagination, filters, sorter);
    if (order) {
      order === 'ascend' && setSortParams({ sort: 1, sortKey: field });
      order === 'descend' && setSortParams({ sort: -1, sortKey: field });
    } else {
      setSortParams({});
    }
  };

  const search = (value: string) => {
    setSearchKey(value);
  };

  return (
    <div>
      <Row gutter={[0, 10]}>
        <Col>
          <Button type="primary" size="small" onClick={openAddModal}>
            <PlusOutlined />
            添加
          </Button>
        </Col>
        <Col offset={1}>
          <Input.Search size="small" placeholder="搜索用户" onSearch={search} allowClear />
        </Col>
      </Row>
      <Table
        dataSource={tableData.list}
        columns={columns}
        onChange={tableChange}
        pagination={{
          current: tableData.page,
          pageSize: tableData.limit,
          total: tableData.total
        }}
        rowKey="id"
        size="small"
      />
      <UserAdd visible={addModalVisible} close={closeModal} />
    </div>
  );
};

export default UserList;
