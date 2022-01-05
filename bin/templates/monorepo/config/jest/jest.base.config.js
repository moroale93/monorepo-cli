const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
const jestConfigDir = path.resolve(__dirname);
const mainDir = path.resolve(__dirname, '../..');

module.exports = {
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx'],

  testEnvironment: 'jsdom',
  testRegex: null,
  testMatch: ['**/*.test.{js,ts,tsx}', '**/__tests__/*.{js,ts,tsx}'],

  preset: 'ts-jest/presets/js-with-babel',

  verbose: true,
  clearMocks: true,
  restoreMocks: true,

  cache: true,
  cacheDirectory: `${mainDir}/.jest-cache`,

  transformIgnorePatterns: ['node_modules'],

  coverageDirectory: 'test-results/jest/coverage',
  coverageThreshold: {
    global: {branches: 100, functions: 100, lines: 100, statements: 100},
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],

  globals: {
    'ts-jest': {
      tsconfig: `${jestConfigDir}/../typescript/tsconfig-jest.json`,
    },
  },
};
