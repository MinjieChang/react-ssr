import Routes from '../router'
import { renderToString } from 'react-dom/server';
//重要是要用到StaticRouter
import { StaticRouter } from 'react-router-dom'; 
import React from 'react'
import { Provider } from 'react-redux';
import getStore from '../store'

export const render = (req) => {
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