import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Input, Col, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { tableDataDefault, paginationConfig } from '../../config';
import { TableAction } from '../../components';
import { getTagListService, deleteTagService } from '../../services/tag';
import TagModal from './TagModal';

const Tag: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(tableDataDefault);
  const [sortParams, setSortParams] = useState<SortParams>({});
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalId, setModalId] = useState('');

  useEffect(() => {
    setLoading(true);
    getTagListService({
      page: tableData.page,
      limit: tableData.limit,
      name: searchKey,
      ...sortParams
    }).then(res => {
      setLoading(false);
      setTableData(res);
    });
  }, [tableData.page, tableData.limit, sortParams, searchKey, modalSubmit]);

  const openEditModal = ({ id }: { id?: string }) => {
    setModalTitle('编辑标签');
    setModalId(id!);
    setModalVisible(true);
  };

  const deleteConfirm = async ({ id }: { id?: string }) => {
    await deleteTagService(id!);
    message.success('删除成功');
    setModalSubmit(!modalSubmit);
  };

  const modalClose = () => {
    setModalId('');
    setModalVisible(false);
  };

  const columns: ColumnsType<{}> = [
    { title: '标签名', dataIndex: 'name', width: 180, sorter: true },
    { title: '说明', dataIndex: 'description' },
    {
      title: '操作',
      key: 'action',
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
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setModalTitle('添加标签');
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加
          </Button>
        </Col>
        <Col offset={1}>
          <Input.Search size="small" placeholder="搜索标签名" onSearch={value => setSearchKey(value)} allowClear />
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
      <TagModal
        title={modalTitle}
        id={modalId}
        visible={modalVisible}
        modalClose={modalClose}
        modalSubmit={() => setModalSubmit(!modalSubmit)}
      />
    </div>
  );
};

export default Tag;
