import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { adminRoutes } from '../../routes';
import { Layout, Card } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default () => {
  return (
    <Layout id="layout">
      <Sidebar />
      <Layout>
        <Header />
        <Layout.Content id="content">
          <Switch>
            {adminRoutes.map(route => (
              <Route
                key={route.path as string}
                path={route.path}
                exact={route.exact}
                render={() => {
                  const Content = route.component as React.SFC;
                  return (
                    <Card className="card" title={route.title} bordered={false} headStyle={{ fontWeight: 'bold' }}>
                      <Content />
                    </Card>
                  );
                }}
              />
            ))}
            <Redirect to={adminRoutes[0].path as string} from="/admin" exact />
            <Redirect to="/404" />
          </Switch>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
