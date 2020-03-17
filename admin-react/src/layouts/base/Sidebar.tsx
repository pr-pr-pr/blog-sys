import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { adminRoutes } from '../../routes';

export default () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [menuKey, setMenuKey] = useState(adminRoutes[0].path as string);

  useEffect(() => {
    setMenuKey(pathname);
  }, [pathname]);

  return (
    <Layout.Sider id="sidebar" theme="light">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div>Admin</div>
        </div>
        <Menu
          className="menu"
          mode="inline"
          selectedKeys={[menuKey]}
          onClick={({ key }) => {
            setMenuKey(key);
            history.push(key);
          }}
        >
          {adminRoutes.map(route => (
            <Menu.Item key={route.path as string}>
              <route.icon />
              {route.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Layout.Sider>
  );
};
