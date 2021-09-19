const dotenv = require('dotenv');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';
const envPath = basePath + '.' + process.env.NODE_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const fileEnv = dotenv.config({ path: finalPath }).parsed;

const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    tab: path.resolve('./client/index.js'),
    background: path.resolve('./client/background.js'),
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('client/static'),
          to: path.resolve('public'),
        },
      ],
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
