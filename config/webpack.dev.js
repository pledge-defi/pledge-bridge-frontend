const common = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '9000',
    hot: true,
    // 使用ngrok内网穿透只返回304，invalid host header,
    // 新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问
    allowedHosts: 'all',
    open: true,
    // host: '192.168.43.79',
  },
});
