const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');

const clientConfig = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', {
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

module.exports = merge(config, clientConfig);