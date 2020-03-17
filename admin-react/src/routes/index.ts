import { Login, NotFound, User, Article, Tag } from '../views/index';
import { RouteProps } from 'react-router-dom';
import { UserOutlined, FileTextOutlined, TagsOutlined } from '@ant-design/icons';

interface IRoute extends RouteProps {
  title?: string;
  icon?: any;
}

export const mainRoutes: RouteProps[] = [
  { path: '/login', component: Login, exact: true },
  { path: '/404', component: NotFound }
];

export const adminRoutes: IRoute[] = [
  { path: '/admin/user', component: User, exact: true, title: '用户管理', icon: UserOutlined },
  { path: '/admin/article', component: Article, exact: true, title: '文章管理', icon: FileTextOutlined },
  { path: '/admin/tag', component: Tag, exact: true, title: '标签管理', icon: TagsOutlined }
];
