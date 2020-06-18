import React from 'react'
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom'; 
import { renderToString } from 'react-dom/server';
import { matchRoutes } from "react-router-config";

import Routes, { routes } from '../router';
import getStore from '../store'

// 改造这里 服务端做数据预取
export const render = (req) => {
  console.log(req.url.pathname, 'req.url.pathname')
  console.log(req.baseUrl, 'req.baseUrl')
  const matched = matchRoutes(routes, req.baseUrl)
  console.log(matched, 'matched')
  //构建服务端的路由
  // const content = renderToString(React.createElement(StaticRouter, {location: req.path}, Routes));
  const content = renderToString(
    <Provider store={getStore()}>
      <StaticRouter location={req.baseUrl}>{Routes}</StaticRouter>
    </Provider>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `
}