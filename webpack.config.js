const path = require('path');

module.exports = {
  name: 'webgpu-example',
  entry: ['babel-polyfill', './src/index.ts'],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname + '/dist'),
    library: 'webgpuexample',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'webgpu-example': __dirname,
    },
    extensions: ['.ts', '.js', '.json'],
  },
};
