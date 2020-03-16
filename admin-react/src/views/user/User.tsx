import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Input, Col, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { tableDataDefault, paginationConfig } from '../../config';
import { TableAction } from '../../components';
import { roleFilter } from '../../utils/filters';
import { getUserListService, deleteUserService } from '../../services/user';
import UserModal from './UserModal';

const User: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(tableDataDefault);
  const [sortParams, setSortParams] = useState<SortParams>({});
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [modalId, setModalId] = useState('');

  useEffect(() => {
    setLoading(true);
    getUserListService({
      page: tableData.page,
      limit: tableData.limit,
      username: searchKey,
      ...sortParams
    }).then(res => {
      setLoading(false);
      setTableData(res);
    });
  }, [tableData.page, tableData.limit, sortParams, searchKey, modalSubmit]);

  const openEditModal = ({ id }: { id?: string }) => {
    setModalId(id!);
    setModalVisible(true);
  };

  const deleteConfirm = async ({ id }: { id?: string }) => {
    await deleteUserService(id!);
    message.success('删除成功');
    setModalSubmit(!modalSubmit);
  };

  const modalClose = () => {
    setModalId('');
    setModalVisible(false);
  };

  const columns: ColumnsType<{}> = [
    { title: '用户名', dataIndex: 'username', width: 180, sorter: true },
    { title: '简介', dataIndex: 'summary' },
    { title: '角色', dataIndex: 'isAdmin', width: 80, sorter: true, render: roleFilter },
    { title: '创建时间', dataIndex: 'createdAt', width: 180, sorter: true },
    { title: '更新时间', dataIndex: 'updatedAt', width: 180, sorter: true },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <TableAction record={record} openEditModal={openEditModal} deleteConfirm={deleteConfirm} />
      )
    }
  ];

  const tableChange: AntdTableChange = ({ current, pageSize }, filters, { order, field }) => {
    setTableData({ ...tableData, page: current, limit: pageSize });
    if (order) {
      order === 'ascend' && setSortParams({ sort: 1, sortKey: field });
      order === 'descend' && setSortParams({ sort: -1, sortKey: field });
    } else {
      setSortParams({});
    }
  };

  return (
    <div>
      <Row gutter={[0, 10]}>
        <Col>
          <Button type="primary" size="small" onClick={() => setModalVisible(true)}>
            <PlusOutlined />
            添加
          </Button>
        </Col>
        <Col offset={1}>
          <Input.Search size="small" placeholder="搜索用户" onSearch={value => setSearchKey(value)} allowClear />
        </Col>
      </Row>
      <Table
        loading={loading}
        dataSource={tableData.list}
        columns={columns}
        onChange={tableChange}
        pagination={paginationConfig(tableData)}
        rowKey="id"
        size="small"
      />
      <UserModal
        id={modalId}
        visible={modalVisible}
        modalClose={modalClose}
        modalSubmit={() => setModalSubmit(!modalSubmit)}
      />
    </div>
  );
};

export default User;
