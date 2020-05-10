const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const logfRoot = path.resolve(__dirname);
const srcRoot = path.join(logfRoot, 'src');
const distRoot = path.join(logfRoot, 'dist');

const serverConfig = {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: false
  },
  context: srcRoot,
  entry: {
    server: './server/index.js'
  },
  output: {
    path: distRoot,
    filename: '[name].bundle.js',
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
  },
  resolve: {
    alias: {
      'logf-common': path.resolve(srcRoot, 'common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: [
    {
      // `socket.io` depends on `uws` which is deprecated
      // see: https://github.com/socketio/engine.io/issues/575#issuecomment-578081012
      uws: 'uws'
    },
    nodeExternals()
  ]
};

const clientConfig = {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: false
  },
  context: srcRoot,
  entry: {
    client: './client/index.js'
  },
  output: {
    path: path.join(distRoot, 'public'),
    filename: '[name].bundle.js',
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcRoot, 'client', 'index.html')
    })
  ],
  resolve: {
    symlinks: true,
    alias: {
      'logf-common': path.resolve(srcRoot, 'common')
    },
    modules: [
      // see: https://github.com/webpack/webpack/issues/8824#issuecomment-475995296
      './node_modules',
      './src/common'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = [
  serverConfig,
  clientConfig
];