import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { loginService, LoginParamTypes } from '../../services';

const Login: React.FC = () => {
  localStorage.clear();
  const history = useHistory();

  const submit = async (values: LoginParamTypes) => {
    await loginService(values);
    console.log(localStorage.getItem('token'));
    message.success('登录成功');
    history.push('/admin');
  };

  return (
    <div id="login">
      <Card title="登录" className="card" headStyle={{ textAlign: 'center', fontSize: 20 }}>
        <Form size="large" onFinish={values => submit(values as LoginParamTypes)}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名不能少于 3 个字符' },
              { max: 32, message: '用户名不能超过 32 个字符' }
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 3, message: '密码不能少于 3 个字符' },
              { max: 32, message: '密码不能超过 32 个字符' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button className="login-submit" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
