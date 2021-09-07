const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  externals: {
    sigma: 'sigma',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      sigma: 'sigma',
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'twitch-shared-community-graph',
      template: './src/index.html',
      filename: './index.html', // relative to root of the application
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/presentation/Home/css/main.css', to: './main.css'},
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js%/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
