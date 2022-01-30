/**
 * commonjs 模块 webpkack 配置
 */
'use strict';

const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
};
