import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { adminRoutes } from '../../routes';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const [menuKey, setMenuKey] = useState(adminRoutes[0].path as string);
  useEffect(() => {
    setMenuKey(location.pathname);
  }, [location]);

  return (
    <Layout.Sider id="sidebar" theme="light">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div>Admin</div>
        </div>
        <Menu
          className="menu"
          selectedKeys={[menuKey]}
          onClick={({ key }) => {
            setMenuKey(key);
            history.push(key);
          }}
        >
          {adminRoutes.map(route => (
            <Menu.Item key={String(route.path)}>
              <route.icon />
              {route.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Layout.Sider>
  );
};
