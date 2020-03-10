import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseLayout from './layouts/base/BaseLayout';
import { mainRoutes } from './routes';
import './less/main.less';
import { updateUserInfoAsync } from './store/info/actions';

interface AppProps {
  updateUserInfoAsync: any;
}

const App: React.SFC<AppProps> = ({ updateUserInfoAsync }) => {
  return (
    <Switch>
      <Route
        path="/admin"
        render={() => {
          if (localStorage.getItem('token')) {
            updateUserInfoAsync();
            return <BaseLayout />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      {mainRoutes.map(route => (
        <Route key={route.path as string} path={route.path} exact={route.exact} component={route.component} />
      ))}
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  );
};

export default connect(null, { updateUserInfoAsync })(App);
