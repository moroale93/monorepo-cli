const baseConfig = require('./webpack.config.base');

module.exports = {
  ...baseConfig,
  mode: 'development',
  devServer: {
    client: {
      logging: 'error',
    },
    compress: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 8888,
  },
};
