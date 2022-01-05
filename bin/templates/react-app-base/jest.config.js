const baseConfig = require('../../config/jest/jest.base.config');

const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  rootDir: __dirname,
  name: packageName,
  displayName: packageName,

  roots: ['<rootDir>'],
};

