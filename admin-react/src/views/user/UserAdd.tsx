import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface UserAddProps {
  visible: boolean;
  close: () => void;
}

const UserAdd: React.FC<UserAddProps> = ({ visible, close }) => {
  const submit = async (values: any) => {
    // await
    console.log(values);
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Modal title="Title" visible={visible} footer={null} onCancel={handleCancel}>
      <Form onFinish={submit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名不能少于 3 个字符' },
            { max: 32, message: '用户名不能超过 32 个字符' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 3, message: '密码不能少于 3 个字符' },
            { max: 32, message: '密码不能超过 32 个字符' }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="角色" name="isAdmin">
          <Input />
        </Form.Item>
        <Form.Item label="简介" name="summary">
          <Input />
        </Form.Item>
        <Form.Item label="头像" name="avatar">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAdd;
