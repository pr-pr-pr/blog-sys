import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { addTagService, TagParamTypes, getTagDetailService, updateTagService } from '../../services/tag';

interface TagModalProps {
  title: string;
  id: string;
  visible: boolean;
  modalClose: () => void;
  modalSubmit: () => void;
}

const TagModal: React.FC<TagModalProps> = ({ title, visible, modalClose, modalSubmit, id }) => {
  const [formInitData, setFormInitData] = useState({});
  const [sw, setSw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && id && sw) {
      getTagDetailService(id).then(res => {
        setSw(false);
        form.setFieldsValue(res);
      });
    }
  }, [form, visible, id, sw]);

  const close = () => {
    modalClose();
    setSw(true);
    setLoading(false);
    setFormInitData({});
    form.resetFields();
  };

  const submit = async (values: TagParamTypes) => {
    setLoading(true);
    if (!id) {
      await addTagService(values);
      message.success('添加成功');
    } else {
      await updateTagService(id, values);
      message.success('修改成功');
    }
    modalSubmit();
    close();
  };

  return (
    <Modal forceRender title={title} visible={visible} footer={null} onCancel={close}>
      <Form
        form={form}
        onFinish={values => submit(values as TagParamTypes)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={formInitData}
      >
        <Form.Item label="标签名" name="name" rules={[{ required: true, message: '请输入标签名' }]}>
          <Input placeholder="设置标签名" />
        </Form.Item>
        <Form.Item label="说明" name="description">
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

export default TagModal;
