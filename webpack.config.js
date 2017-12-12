const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OUTPUT_PATH = path.resolve(__dirname, './app/public/');
const PUBLIC_PATH = '//10.209.242.72/bss-backoffice-icp-node/public/';
const vendor = require('./vendor');
const isProd = process.env.NODE_ENV === 'production';

const opt = {
  entry: {
    vendor,
    app: './app/web/index'
  },
  output: {
    path: OUTPUT_PATH, // 打包后的文件存放的地方
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js', // 打包后输出文件的文件名
    publicPath: isProd ? PUBLIC_PATH : '/' // 文件引入目录
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
                minimize: isProd
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
                minimize: isProd,
                localIdentName: '[hash:base64:5]'
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
            name: 'images/[name].[ext]',
            limit: 1024
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};

if (!isProd) {
  opt.devtool = 'eval-source-map';
  opt.devServer = {
    contentBase: OUTPUT_PATH,
    historyApiFallback: true,
    port: 3000, // 端口
    inline: true,
    hot: true,
    proxy: [{
      context: ['/icp/api', '/api'],
      target: 'http://127.0.0.1:7001',
      pathRewrite: {'^/icp/api': '/api'},
      changeOrigin: true,
      secure: false
    }]
  };
}

const _plugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: './app/web/index.html',
    filename: isProd ? '../view/index.html' : 'index.html',
    inject: 'body',
    showErrors: false,
    minify: {
      removeComments: isProd, // 移除HTML中的注释
      collapseWhitespace: isProd // 删除空白符与换行符
    }
  }),
  new ExtractTextPlugin(isProd ? 'css/[name].[chunkhash].css' : 'css/[name].css'),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  }),
  new ImageminPlugin({
    pngquant: {
      quality: '95-100'
    }
  })
];

if (isProd) {
  _plugin.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }));
} else {
  _plugin.push(new webpack.HotModuleReplacementPlugin()); // 热加载插件
}

opt.plugins = _plugin;

module.exports = opt;
