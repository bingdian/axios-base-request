module.exports = {
  verbose: true,
  setupFiles: [
    '<rootDir>/__test__/setup.js',
  ],
  collectCoverage: true,
  testPathIgnorePatterns: [
    '<rootDir>/src/compose.js',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/compose.js',
  ],
};
