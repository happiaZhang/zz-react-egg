'use strict';

/**
 * 基础配置
 */
module.exports = appInfo => {
  const config = {};

  // app key
  config.keys = 'bss-backoffice-node';

  // view 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html'
  };

  // 统一错误定义
  config.errors = require('./errors/config');
  // 正则表达式
  config.regex = require('./regex/config');
  // 用户权限
  config.permission = require('./permission/config');

  return config;
};
