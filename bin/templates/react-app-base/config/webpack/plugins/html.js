const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../../../index.html'),
  filename: 'index.html',
  inject: true,
});
