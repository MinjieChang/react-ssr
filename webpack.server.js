const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.base');

const serverConfig = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  mode: 'development',
  entry: './server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  // 无法处理css样式，导致报错。解决办法，添加 whitelist
  externals: [nodeExternals({ whitelist: /\.css$/ })], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['isomorphic-style-loader', { // 注意，在服务端需要使用此loader isomorphic-style-loader
          loader: 'css-loader',
          options: { 
            modules: {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              hashPrefix: 'my-custom-hash',
            },
            localsConvention: 'camelCase',
          }
        }],
      }
    ],
  }
}

module.exports = merge(config, serverConfig);