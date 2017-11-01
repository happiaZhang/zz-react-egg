'use strict';

/**
 * 基础配置
 */
module.exports = appInfo => {
  const config = {};

  // app key
  config.keys = 'wandacloud-bss-node';

  // view 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html'
  };

  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api'
  };

  // 统一错误定义
  config.errors = require('./errors/config');
  // 正则表达式
  config.regex = require('./regex/config');

  return config;
};
