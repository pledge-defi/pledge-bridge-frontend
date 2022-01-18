const common = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '9000',
    open: true,
    hot: true,
    // host:'192.168.199.132'
  },
});
