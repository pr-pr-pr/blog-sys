import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseLayout from './layouts/base/BaseLayout';
import { mainRoutes } from './routes';
import './less/main.less';
import { updateInfoAsync } from './store/info/actions';

interface AppProps {
  updateInfoAsync: () => void;
}

const App: React.SFC<AppProps> = ({ updateInfoAsync }) => {
  const isLogin = !!localStorage.getItem('token');
  if (isLogin) {
    updateInfoAsync();
  }
  return (
    <Switch>
      <Route
        path="/admin"
        render={() => {
          if (isLogin) {
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

export default connect(null, { updateInfoAsync })(App);
