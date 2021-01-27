const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const rootPath = (exports.rootPath = path.join(__dirname, '..'));
const srcPath = (exports.srcPath = path.join(rootPath, 'src'));
const distPath = (exports.distPath = path.join(rootPath, 'dist'));

const environment = (exports.environment =
  process.env.NODE_ENV || 'development');

const baseConfig = (exports.baseConfig = {
  entry: {
    index: path.join(srcPath, 'index.ts'),
  },
  output: {
    path: distPath,
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      ENVIRONMENT: environment,
    }),
    new HTMLWebpackPlugin({
      title: '深圳住房轮候',
      template: path.join(srcPath, 'index.ejs'),
      favicon: path.join(rootPath, 'static/favicon.ico'),
    }),
    new HtmlWebpackTagsPlugin({
      tags: ['static/lib/jsencrypt.min.js'],
      append: false,
    }),
  ],
});

exports.devConfig = merge(baseConfig, {});
exports.prodConfig = merge(baseConfig, {});
