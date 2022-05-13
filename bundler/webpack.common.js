const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/script.js'),
  output:
  {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  plugins:
  [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../static') }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: true
    }),
    new MiniCSSExtractPlugin()
  ],
  module:
  {
    rules:
    [
      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              "...",
              {
                tag: "img",
                attribute: "data-src",
                type: "src",
              },
              {
                tag: "img",
                attribute: "data-srcset",
                type: "srcset",
              },
            ],
          },
        },
      },

      // JS
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },

      // CSS
      {
        test: /\.css$/,
        use:
        [
          MiniCSSExtractPlugin.loader,
          'css-loader'
        ]
      },

      // Images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
              outputPath: 'assets/images/'
            }
          }
        ]
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
              outputPath: 'assets/fonts/'
            }
          }
        ]
      }
    ]
  }
};
