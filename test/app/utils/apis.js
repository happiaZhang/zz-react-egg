'use strict';

const {app} = require('egg-mock/bootstrap');

// 模拟登录操作 并设置登录cookie
module.exports.loginAction = async() => {
  const ctx = app.mockContext();
  const result = await ctx.service.unittest.login('zhangzheng44', 'zhangzheng123456');

  app.mockCookies({
    amsid: result
  });
};
