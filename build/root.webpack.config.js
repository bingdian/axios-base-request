const path                   = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generateConfig(name) {
  const prod   = name.indexOf('min') > -1;
  const config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: `${name}.js`,
      sourceMapFilename: `${name}.map`,
      libraryExport: 'default',
      library: 'axiosBaseRequest',
      libraryTarget: 'umd',
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    devServer: {
      contentBase: './',
      writeToDisk: true,
      openPage: '/examples/',
      port: 9000,
    },
  };

  if (prod) {
    return Object.assign({}, config, {
      mode: 'production',
    });
  }

  return config;
}

module.exports = [
  generateConfig('axios.base.request.min'),
  generateConfig('axios.base.request'),
];
