import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Radio, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { uploadService } from '../../services';
import { SERVER_HOST } from '../../config';
import { addUserService, UserParamTypes, getUserDetail, updateUserService } from '../../services/user';

interface UserModalProps {
  id: string;
  visible: boolean;
  modalClose: () => void;
  modalSubmit: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ visible, modalClose, modalSubmit, id }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [formInitData, setFormInitData] = useState({ isAdmin: false });
  const [sw, setSw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && id && sw) {
      getUserDetail(id).then(res => {
        setSw(false);
        res.avatar && setImageUrl(res.avatar);
        form.setFieldsValue(res);
      });
    }
  }, [form, visible, id, sw]);

  const close = () => {
    modalClose();
    setImageUrl('');
    setSw(true);
    setLoading(false);
    setFormInitData({ isAdmin: false });
    form.resetFields();
  };

  const submit = async (values: UserParamTypes) => {
    setLoading(true);
    values.avatar = imageUrl;
    if (!id) {
      await addUserService(values);
      message.success('添加成功');
    } else {
      await updateUserService(id, values);
      message.success('修改成功');
    }
    modalSubmit();
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
    <Modal forceRender title="Title" visible={visible} footer={null} onCancel={close}>
      <Form
        form={form}
        onFinish={values => submit(values as UserParamTypes)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={formInitData}
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
          <Input placeholder="设置用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { min: 3, message: '密码不能少于 3 个字符' },
            { max: 32, message: '密码不能超过 32 个字符' }
          ]}
        >
          <Input.Password placeholder="设置密码" />
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
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
