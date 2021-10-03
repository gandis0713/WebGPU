const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: ['./lib/index.ts'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname + './../build'),
    publicPath: '/',
  },
  mode,
  module: {
    rules: [
      {
        test: /\.wgsl$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
