const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?modules=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader'),
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'src'),
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      title: 'Basics',
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
  },
};
