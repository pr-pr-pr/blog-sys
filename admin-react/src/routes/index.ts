import { Login, NotFound, Welcome, UserList, ArticleList, TagList } from '../views/index';
import { RouteProps } from 'react-router-dom';
import { HomeOutlined, UserOutlined, FileTextOutlined, TagsOutlined } from '@ant-design/icons';

interface IRoute extends RouteProps {
  title?: string;
  icon?: any;
}

export const mainRoutes: RouteProps[] = [
  { path: '/login', component: Login, exact: true },
  { path: '/404', component: NotFound }
];

export const adminRoutes: IRoute[] = [
  { path: '/admin/welcome', component: Welcome, exact: true, title: '欢迎', icon: HomeOutlined },
  { path: '/admin/user/list', component: UserList, exact: true, title: '用户', icon: UserOutlined },
  { path: '/admin/article/list', component: ArticleList, exact: true, title: '文章', icon: FileTextOutlined },
  { path: '/admin/tag/list', component: TagList, exact: true, title: '标签', icon: TagsOutlined }
];
