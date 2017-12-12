'use strict';

/**
 * plugin 配置
 */
module.exports = {

  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate'
  },

  // view模板
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },

  // redis-store
  redis: {
    enable: true,
    package: 'egg-redis'
  },

  // 关闭内置的 i18n 插件（国际化）
  i18n: {
    enable: false
  }
};
