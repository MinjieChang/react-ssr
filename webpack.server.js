const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.base');

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()], // externals 目的是避免打包node的内置模块 如fs等
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