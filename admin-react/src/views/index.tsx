import React from 'react';
import loadable from '@loadable/component';
import { Loading } from '../components';

export const Login = loadable(() => import('./login/Login'), {
  fallback: <Loading />
});

export const NotFound = loadable(() => import('./exception/NotFound'), {
  fallback: <Loading />
});

export const User = loadable(() => import('./user/User'), {
  fallback: <Loading />
});

export const Article = loadable(() => import('./article/Article'), {
  fallback: <Loading />
});

export const Tag = loadable(() => import('./tag/Tag'), {
  fallback: <Loading />
});
