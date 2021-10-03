const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const paths = {
  index: path.resolve(__dirname + '/src/index.tsx'),
  build: path.resolve(__dirname + '/build'),
  public: {
    root: path.resolve(__dirname + '/public'),
    index: path.resolve(__dirname + '/public/index.html'),
  },
};

module.exports = {
  entry: [paths.index],
  output: {
    filename: 'index.js',
    path: paths.build,
    publicPath: '/',
  },
  devServer: {
    contentBase: paths.public.root,
    index: 'index.html',
    port: 9870,
    historyApiFallback: true,
    publicPath: '/',
    writeToDisk: true,
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
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: paths.public.index,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@WebGPULib': path.resolve(__dirname + '/../build'),
    },
  },
};
