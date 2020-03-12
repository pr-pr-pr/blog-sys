import axios from 'axios';
import { message } from 'antd';
import { SERVER_HOST } from '../config';

// Axios 实例
const service = axios.create({
  baseURL: SERVER_HOST,
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
    const res = error.response;
    if (res && res.data && res.data.message) {
      message.error(res.data.message);
      return Promise.reject(res.data);
    }
    message.error('网络错误');
    return Promise.reject(error);
  }
);

export default service;
