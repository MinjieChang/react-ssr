import React from 'react';
import { Link } from 'react-router-dom'
import { renderRoutes } from "react-router-config";

import Home from './routes/Home';
import Login from './routes/Login'
import Page from './routes/Page'
import PageTwo from './routes/PageTwo'
import BreadCrumbs from './components/BreadCrumbs'

import { flattenRoutes, getBreadcrumbs} from './utils'

// 根组件
const Root = ({ route, ...rest }) => {
  const { location } = rest
  let breadcrumbs = getBreadcrumbs({flattenRoutes: flattenRoutes(routes), location})
  return (
    <div>
      <div>
        <Link to="/home">home</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div style={{margin: '20px 0'}}>
        <div>面包屑：</div>
        <BreadCrumbs breadcrumbs={breadcrumbs} location={location}></BreadCrumbs>
      </div>
      {renderRoutes(route.routes)}
    </div>
  )
};

export const routes = [
  {
    breadcrumb: '首页',
    path: "/",
    component: Root,
    routes: [
      {
        breadcrumb: 'home',
        path: "/home",
        exact: true,
        component: Home,
        loadData: Home.loadData,//服务端获取异步数据的函数
      },
      {
        breadcrumb: 'login',
        path: "/login",
        component: Login,
        routes: [
          {
            breadcrumb: 'page',
            path: "/login/page",
            component: Page,
            exact: true,
          },
          {
            breadcrumb: 'page2',
            path: "/login/pageTwo",
            component: PageTwo,
            exact: true,
          }
        ]
      }
    ]
  }
];

export default (
  <div>
    { renderRoutes(routes) }
  </div>
)