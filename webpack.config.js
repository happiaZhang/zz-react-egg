const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OUTPUT_PATH = path.resolve(__dirname, './app/public/');
const PUBLIC_PATH = '//10.209.242.72/bss-backoffice-icp-node/public/';
const vendor = require('./vendor');
const isProd = process.env.NODE_ENV === 'production';
const genHtmlTemplate = (dir, chunks, filename) => {
  if (!filename) filename = 'index';
  return new HtmlWebpackPlugin({
    template: dir,
    filename: isProd ? `../view/${filename}.html` : `${filename}.html`,
    inject: 'body',
    chunks,
    showErrors: false,
    minify: {
      removeComments: isProd, // 移除HTML中的注释
      collapseWhitespace: isProd // 删除空白符与换行符
    }
  });
};

const opt = {
  entry: {
    vendor,
    icp: './app/web/icp/index',
    acc: './app/web/acc/index'
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
    historyApiFallback: {
      rewrites: [
        {from: /^\/icp\/acc/, to: '/acc.html'}
      ]
    },
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
  genHtmlTemplate('./app/web/icp/index.html', ['icp', 'common', 'vendor', 'manifest']),
  genHtmlTemplate('./app/web/acc/index.html', ['acc', 'common', 'vendor', 'manifest'], 'acc'),
  new ExtractTextPlugin(isProd ? 'css/[name].[chunkhash].css' : 'css/[name].css'),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['common', 'vendor', 'manifest'],
    minChunks: 2
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
