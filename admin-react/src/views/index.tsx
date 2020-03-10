import React from 'react';
import loadable from '@loadable/component';
import { Loading } from '../components';

export const Login = loadable(() => import('./login/Login'), {
  fallback: <Loading />
});

export const NotFound = loadable(() => import('./exception/NotFound'), {
  fallback: <Loading />
});

export const Welcome = loadable(() => import('./welcome/Welcome'), {
  fallback: <Loading />
});

export const UserList = loadable(() => import('./user/UserList'), {
  fallback: <Loading />
});

export const ArticleList = loadable(() => import('./article/ArticleList'), {
  fallback: <Loading />
});

export const TagList = loadable(() => import('./tag/TagList'), {
  fallback: <Loading />
});
