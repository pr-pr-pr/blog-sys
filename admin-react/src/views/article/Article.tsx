import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Input, Col, message, Tag, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { tableDataDefault, paginationConfig } from '../../config';
import { TableAction } from '../../components';
import { getArticleListService, deleteArticleService } from '../../services/article';
import ArticleModal from './ArticleModal';
import { getAllUserService, GetAllUserResultTypes, GetAllTagResultTypes, getAllTagService } from '../../services/all';

let userList: GetAllUserResultTypes[] = [];
getAllUserService().then(res => (userList = res));
let tagList: GetAllTagResultTypes[] = [];
getAllTagService().then(res => (tagList = res));

const Article: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>(tableDataDefault);
  const [sortParams, setSortParams] = useState<SortParams>({});
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalId, setModalId] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    setLoading(true);
    getArticleListService({
      page: tableData.page,
      limit: tableData.limit,
      title: searchKey,
      author: searchUser,
      tag: searchTag,
      ...sortParams
    }).then(res => {
      setLoading(false);
      setTableData(res);
    });
  }, [tableData.page, tableData.limit, sortParams, searchKey, modalSubmit, searchUser, searchTag]);

  const openEditModal = ({ id }: { id?: string }) => {
    setModalTitle('编辑文章');
    setModalId(id!);
    setModalVisible(true);
  };

  const deleteConfirm = async ({ id }: { id?: string }) => {
    await deleteArticleService(id!);
    message.success('删除成功');
    setModalSubmit(!modalSubmit);
  };

  const modalClose = () => {
    setModalId('');
    setModalVisible(false);
  };

  const columns: ColumnsType<{}> = [
    { title: '文章标题', dataIndex: 'title', width: 180, sorter: true },
    { title: '作者', dataIndex: 'author', width: 100, sorter: true },
    {
      title: '标签',
      key: 'tags',
      width: 180,
      render: (text, { tags }: { tags?: string[] }) => {
        return (
          <div>
            {tags?.map((i, index) => (
              <Tag key={i}>{i}</Tag>
            ))}
          </div>
        );
      }
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 150, sorter: true },
    { title: '更新时间', dataIndex: 'updatedAt', width: 150, sorter: true },
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
              setModalTitle('添加文章');
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加
          </Button>
        </Col>
        <Col offset={1}>
          <Input.Search size="small" placeholder="搜索文章标题" onSearch={value => setSearchKey(value)} allowClear />
        </Col>
        <Col offset={1}>
          <Select
            style={{ width: 200 }}
            size="small"
            placeholder="根据用户筛选"
            filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={val => setSearchUser(val as string)}
            allowClear
            showSearch
          >
            {userList.map(i => (
              <Select.Option key={i.id} value={i.id}>
                {i.username}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col offset={1}>
          <Select
            style={{ width: 200 }}
            size="small"
            placeholder="根据标签筛选"
            filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={val => setSearchTag(val as string)}
            allowClear
            showSearch
          >
            {tagList.map(i => (
              <Select.Option key={i.id} value={i.id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
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
      <ArticleModal
        title={modalTitle}
        id={modalId}
        visible={modalVisible}
        modalClose={modalClose}
        modalSubmit={() => setModalSubmit(!modalSubmit)}
        userList={userList}
        tagList={tagList}
      />
    </div>
  );
};

export default Article;
