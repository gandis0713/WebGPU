const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname + '/build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.resolve('./public'),
    index: 'index.html',
    port: 4141,
    historyApiFallback: true,
    publicPath: '/',
    writeToDisk: true,
  },
  mode: 'development',
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
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
  ],
};
