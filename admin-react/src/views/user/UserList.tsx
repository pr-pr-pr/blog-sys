import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { UserListState } from '../../store/user/types';
import { updateUserListAsync } from '../../store/user/actions';
import { Table } from 'antd';

interface UserListProps {
  userList: UserListState;
  updateUserListAsync: Function;
}

const UserList: React.SFC<UserListProps> = ({ userList, updateUserListAsync }) => {
  useEffect(() => {
    updateUserListAsync();
  }, [updateUserListAsync]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '简介', dataIndex: 'summary', key: 'summary' },
    { title: '角色', dataIndex: 'isAdmin', key: 'isAdmin' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' }
  ];

  return (
    <div>
      <Table dataSource={userList.list} columns={columns} rowKey="id" size="small" />
    </div>
  );
};

export default connect(
  (state: AppState) => {
    return {
      userList: state.user.userList
    };
  },
  { updateUserListAsync }
)(UserList);
