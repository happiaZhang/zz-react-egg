const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'eval-source-map',

    entry: __dirname + '/app/web/index.js',
    output: {
        path: __dirname + '/app/webpack_dev',
        filename: '[name]-[hash].js',
        publicPath: '/',
    },

    devServer: {
        contentBase: './app/webpack_dev', //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        port: 3000, //端口
        inline: true, //实时刷新
        hot: true, //热更新，暂时没弄懂跟inline有什么区别，比只有inline更流畅，没有闪屏
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                secure: false,
            },
        },
    },

    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: 'babel-loader',
            },
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                },
            }, {
                loader: 'postcss-loader',
            }]
        },
        {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[hash:base64:5]'
                },
            }, {
                loader: 'postcss-loader',
            }, {
                loader: 'sass-loader',
            }]
        },
          {
            test: /\.less$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'less-loader'
              }
            ]
          },
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                },
            },
            exclude: /node_modules/,
        },
        ],
    },

    plugins: [
      new webpack.BannerPlugin('万达云 版权所有'),
      new HtmlWebpackPlugin({
          template: __dirname + '/app/web/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(), //热加载插件
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ],
};
