const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OUTPUT_PATH = path.resolve(__dirname, './app/public/');

module.exports = {
  devtool: 'none', // 生产环境不需要map
  entry: './app/web/index.js', // 唯一入口文件
  output: {
    path: OUTPUT_PATH, // 打包后的文件存放的地方
    filename: 'js/[name]-[hash].js', // 打包后输出文件的文件名
    publicPath: '/public/' // 文件引入目录
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true
              }
            }, {
              loader: 'postcss-loader'
            }
          ]
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        })
      }, {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 1024
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/[name].[hash].js'
    }),
    new HtmlWebpackPlugin({
      template: './app/web/index.html',
      filename: '../view/index.html',
      inject: 'body',
      showErrors: false,
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true // 删除空白符与换行符
      }
    }),
    new ExtractTextPlugin('css/[name].[hash].css')
  ]
};
