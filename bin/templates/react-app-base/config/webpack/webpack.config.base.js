const path = require('path');
const clean = require('./plugins/clean');
const html = require('./plugins/html');
const transpiling = require('./rules/transpiling');

module.exports = {
  target: 'web',
  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: 'assets/[name].[contenthash:8].js',
  },
  entry: {
    index: path.resolve(__dirname, '../../src/index.tsx'),
  },
  module: {
    rules: [
      transpiling,
    ],
  },
  plugins: [
    clean(),
    html(),
  ],
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
    ],
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../src'),
    ],
  },
};
