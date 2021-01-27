const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackProdConfig = require('../config/webpack.prod.conf');
const { prodConfig, rootPath, distPath } = require('./config');

function build(config, webpackConfig) {
  config = Object.assign({}, config);

  webpackConfig = merge(webpackProdConfig, webpackConfig);

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  });
}

function main() {
  const config = {};
  const webpackConfig = {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(rootPath, 'static'),
            to: path.join(distPath, 'static'),
          },
        ],
      }),
    ],
  };
  build(config, merge(prodConfig, webpackConfig));
}

main();
