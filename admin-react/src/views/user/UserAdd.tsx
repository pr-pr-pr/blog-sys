import React, { useState } from 'react';
import { Modal, Form, Input, Button, Radio, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { uploadService } from '../../services';
import { SERVER_HOST } from '../../config';
import { addUserService, AddUserParamTypes } from '../../services/user';

interface UserAddProps {
  visible: boolean;
  close: () => void;
  modalSubmit: () => void;
}

const UserAdd: React.FC<UserAddProps> = ({ visible, close, modalSubmit }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [form] = Form.useForm();

  const submit = async (values: AddUserParamTypes) => {
    values.avatar = imageUrl;
    await addUserService(values);
    message.success('添加成功');
    modalSubmit();
    close();
  };

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const fileChange = async ({ file }: UploadChangeParam) => {
    setImageLoading(true);
    const path = await uploadService(file);
    setImageUrl(path);
    setImageLoading(false);
  };

  return (
    <Modal title="Title" visible={visible} footer={null} onCancel={handleCancel}>
      <Form
        form={form}
        onFinish={values => submit(values as AddUserParamTypes)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ isAdmin: false }}
      >
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
          <Radio.Group>
            <Radio value={false}>普通用户</Radio>
            <Radio value={true}>管理员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="头像" name="avatar" valuePropName="fileList" getValueFromEvent={() => imageUrl}>
          <Upload listType="picture-card" showUploadList={false} beforeUpload={() => false} onChange={fileChange}>
            {imageUrl ? <img src={SERVER_HOST + imageUrl} alt="avatar" style={{ width: '100%' }}></img> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="简介" name="summary">
          <Input.TextArea />
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
