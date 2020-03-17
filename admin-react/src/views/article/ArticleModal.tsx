import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select, Row, Col } from 'antd';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import tasklists from 'markdown-it-task-lists';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import {
  addArticleService,
  ArticleParamTypes,
  getArticleDetailService,
  updateArticleService
} from '../../services/article';
import { GetAllUserResultTypes, GetAllTagResultTypes } from '../../services/all';

interface ArticleModalProps {
  title: string;
  id: string;
  visible: boolean;
  modalClose: () => void;
  modalSubmit: () => void;
  userList: GetAllUserResultTypes[];
  tagList: GetAllTagResultTypes[];
}

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
})
  .use(emoji)
  .use(subscript)
  .use(superscript)
  .use(footnote)
  .use(deflist)
  .use(abbreviation)
  .use(insert)
  .use(mark)
  .use(tasklists);

const ArticleModal: React.FC<ArticleModalProps> = ({
  title,
  visible,
  modalClose,
  modalSubmit,
  id,
  userList,
  tagList
}) => {
  const [formInitData, setFormInitData] = useState({});
  const [sw, setSw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mdEditor, setMdEditor] = useState<any>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && id && sw) {
      getArticleDetailService(id).then(res => {
        setSw(false);
        console.log(res);
        form.setFieldsValue(res);
        mdEditor.setText(res.content);
      });
    }
  }, [form, visible, id, sw, mdEditor]);

  const close = () => {
    modalClose();
    mdEditor.setText('');
    setSw(true);
    setLoading(false);
    setFormInitData({});
    form.resetFields();
  };

  const submit = async (values: ArticleParamTypes) => {
    try {
      values.content = mdEditor.getMdValue();
      if (!values.content) {
        message.error('文章内容不能为空');
        return;
      }
      setLoading(true);
      if (!id) {
        await addArticleService(values);
        message.success('添加成功');
      } else {
        await updateArticleService(id, values);
        message.success('修改成功');
      }
      modalSubmit();
      close();
    } catch {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="article-modal"
      width="80%"
      title={title}
      visible={visible}
      footer={null}
      onCancel={close}
      forceRender
    >
      <Form
        form={form}
        onFinish={values => submit(values as ArticleParamTypes)}
        initialValues={formInitData}
        size="small"
        layout="horizontal"
        wrapperCol={{ span: 20 }}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标文章标题' }]}>
              <Input placeholder="设置文章标题" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: '请选择作者' }]}
              wrapperCol={{ span: 15 }}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="选择作者"
                filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                allowClear
                showSearch
              >
                {userList.map(i => (
                  <Select.Option key={i.id} value={i.id}>
                    {i.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签" name="tags" rules={[{ required: true, message: '请选择标签' }]}>
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                placeholder="选择标签"
                filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                allowClear
                showSearch
              >
                {tagList.map(i => (
                  <Select.Option key={i.id} value={i.id}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="摘要"
              name="summary"
              rules={[{ required: true, message: '请输入摘要' }]}
              wrapperCol={{ span: 22 }}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <div className="editor">
          <MdEditor
            ref={node => setMdEditor(node)}
            style={{ height: '500px', width: '100%' }}
            renderHTML={text => mdParser.render(text)}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Button type="primary" size="middle" htmlType="submit" loading={loading}>
            提交
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
