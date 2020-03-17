import React from 'react';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type Record = { id?: string };

interface TableActionProps {
  record: Record;
  openEditModal: (record: Record) => void;
  deleteConfirm: (record: Record) => Promise<void>;
}

const TableAction: React.FC<TableActionProps> = ({ record, openEditModal, deleteConfirm }) => {
  return (
    <div>
      <Button type="primary" size="small" onClick={() => openEditModal(record)}>
        <EditOutlined />
      </Button>
      &nbsp;
      <Popconfirm title="确定删除这条数据？" placement="topRight" onConfirm={() => deleteConfirm(record)}>
        <Button type="danger" size="small">
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default TableAction;
