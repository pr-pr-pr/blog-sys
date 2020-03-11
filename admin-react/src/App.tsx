import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseLayout from './layouts/base/BaseLayout';
import { mainRoutes } from './routes';
import './less/main.less';
import { getInfoService } from './services';
import { updateInfo } from './store/info/actions';

interface AppProps {
  updateInfo: typeof updateInfo;
}

const App: React.FC<AppProps> = ({ updateInfo }) => {
  let sw = true;
  return (
    <Switch>
      <Route
        path="/admin"
        render={() => {
          const isLogin = !!localStorage.getItem('token');
          if (isLogin) {
            if (sw) {
              sw = false;
              getInfoService().then(res => updateInfo(res));
            }
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

export default connect(null, { updateInfo })(App);
