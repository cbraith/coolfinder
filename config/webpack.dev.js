const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),

  entry: [
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, '..', 'src'),
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    overlay: {
      errors: true,
      warnings: true,
    },
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.js$/,
      enforce: 'pre',

      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    }, {
      test: /\.(scss|css)$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }, {
      test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10000, // use data url for assets <= 10KB
        name: 'static/images/[name].[hash].[ext]'
      },
    }]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: './../static',
        to: 'static'
      }
    ]),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, '..', 'src'), 'index.html'),
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'index.html'
    }),
  ]
};
