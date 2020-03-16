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
import { GetAllUserResultTypes } from '../../services/all';

interface ArticleModalProps {
  title: string;
  id: string;
  visible: boolean;
  modalClose: () => void;
  modalSubmit: () => void;
  userList: GetAllUserResultTypes[];
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

const ArticleModal: React.FC<ArticleModalProps> = ({ title, visible, modalClose, modalSubmit, id, userList }) => {
  const [formInitData, setFormInitData] = useState({});
  const [sw, setSw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let mdEditor: any = null;

  useEffect(() => {
    if (visible && id && sw) {
      getArticleDetailService(id).then(res => {
        setSw(false);
        console.log(res);
        // form.setFieldsValue(res);
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

  const submit = async (values: ArticleParamTypes) => {
    values.content = 'test111';
    console.log(values);
    console.log(mdEditor);
    return;
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
  };

  const handleEditorChange = ({ html, text }: { text: string; html: string }) => {
    console.log(text);
    console.log(html);
  };

  return (
    <Modal
      className="article-modal"
      title={title}
      mask={false}
      visible={visible}
      footer={null}
      onCancel={close}
      forceRender
    >
      <Form
        form={form}
        onFinish={values => submit(values as ArticleParamTypes)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={formInitData}
        size="small"
      >
        <Row>
          <Col span={8}>
            <Form.Item
              label="标题"
              name="title"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: '请输入标文章标题' }]}
            >
              <Input placeholder="设置文章标题" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="作者" name="author" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
              <Select
                style={{ width: '100%' }}
                placeholder="根据用户筛选"
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
          <Col span={12}>
            <Form.Item label="摘要" name="summary" labelCol={{ span: 2 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="editor">
          <MdEditor
            ref={node => (mdEditor = node)}
            style={{ height: '100%', width: '100%' }}
            value=""
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <Form.Item style={{ textAlign: 'center' }} wrapperCol={{ span: 24 }}>
          <Button type="primary" size="large" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
