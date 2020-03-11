import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoState } from '../../store/info/types';
import { AppState } from '../../store';

interface HeaderProps {
  info: InfoState;
}

const Header: React.SFC<HeaderProps> = ({ info }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/login">退出登录</Link>
      </Menu.Item>
    </Menu>
  );

  const dateToText = () => {
    const D = new Date();
    const hour = D.getHours();
    if (hour > 22 || hour < 5) return '深夜了，注意休息哦~';
    if (hour > 20) return '晚上好~';
    if (hour > 13) return '下午好~';
    if (hour > 10) return '中午好~';
    if (hour > 4) return '早上好~';
    return 'hello';
  };

  return (
    <Layout.Header id="header">
      {dateToText()}
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="link">
          {info.username}
          <DownOutlined />
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};

export default connect((state: AppState) => ({
  info: state.info
}))(Header);
