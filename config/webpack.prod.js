const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, '..', 'src');
const distDir = path.resolve(__dirname, '..', 'dist');

module.exports = {
  context: srcDir,

  devtool: 'source-map',

  entry: [
    './index.js'
  ],

  output: {
    filename: 'static/bundle.[hash].min.js',
    path: distDir,
    publicPath: '/',
    sourceMapFilename: 'static/bundle.[hash].map',
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
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            minimize: true
          }
        }, {
          loader: "sass-loader"
        }]
      })
    }, {
      test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10000, // use data url for assets <= 10KB
        name: 'static/[name].[hash].[ext]'
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

    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      path: distDir,
      filename: 'index.html',
      minify: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
      }
    }),

    new ExtractTextPlugin("static/bundle.[hash].min.css")
  ]
};
