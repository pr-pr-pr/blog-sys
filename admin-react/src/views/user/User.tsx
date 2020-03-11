import React, { useState, useEffect } from 'react';
import { Table, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getUserListService, GetUserListResultTypes } from '../../services/user';
import UserAdd from './UserAdd';

const UserList: React.FC = () => {
  const [tableData, setTableData] = useState({} as GetUserListResultTypes);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    getUserListService().then(res => setTableData(res));
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '简介', dataIndex: 'summary', key: 'summary' },
    { title: '角色', dataIndex: 'isAdmin', key: 'isAdmin' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' }
  ];

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
  };

  return (
    <div>
      <Col>
        <Button type="primary" onClick={openAddModal}>
          <PlusOutlined />
        </Button>
      </Col>
      <Table dataSource={tableData.list} columns={columns} rowKey="id" size="small" />
      <UserAdd visible={addModalVisible} close={closeModal} />
    </div>
  );
};

export default UserList;
