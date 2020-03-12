import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import configureStore from './store';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={zhCN}>
        <App/>
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
