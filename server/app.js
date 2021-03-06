const express = require('express');
// const React = require('react');
// const { renderToString } = require('react-dom/server')

const { render } = require('./utils');

// require("node-jsx").install()


// const Home =  require('../component/Home');

const app = express()

app.use(express.static('dist'));

app.get('/api/list', function(req, res, next) {
  res.json({
    data: [11,22,33]
  })
})

app.use('*', function(req, res, next) {
  if(req.baseUrl === '/favicon.ico') return res.end()
  // res.send(render(req))
  render(req, res)
})


// const content = renderToString(React.createElement(Home));

// app.use('/', function(req, res, next){
//   res.send(
//     `
//      <html>
//        <head>
//          <title>ssr</title>
//        </head>
//        <body>
//          <div id="root">${content}</div>
//        </body>
//        <script src="/index.js"></script>
//      </html>
//     `
//     );
// })

app.listen(3001, () => {
  console.log('listen on port 3001')
})