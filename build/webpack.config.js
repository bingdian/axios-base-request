'use strict';

const rootWebpackConfig = require('./root.webpack.config');
const commonjsWebpackConfig = require('./commonjs.webpack.config');

module.exports = [
  ...rootWebpackConfig,
  commonjsWebpackConfig,
];
