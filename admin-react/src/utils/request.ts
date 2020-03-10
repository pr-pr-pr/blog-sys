import axios from 'axios';
import { message } from 'antd';

const uri = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : '';

// Axios 实例
const service = axios.create({
  baseURL: uri,
  timeout: 10 * 1000
});

// 请求拦截
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截
service.interceptors.response.use(
  response => response.data,
  error => {
    const { data } = error.response;
    if (data && data.message) {
      message.error(data.message);
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

export default service;
