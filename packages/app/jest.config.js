const base = require('../../jest.config.base');
const pack = require('./package.json');

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '\\.svg$': '<rootDir>/src/mocks/svgr-mock.js',
  },
};
