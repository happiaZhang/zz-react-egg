'use strict';

/**
 * 判断是否为登录用户
 */
module.exports = () => {
  return async function isLogin(ctx, next) {
    // 心跳机制-跳过权限判断
    if (ctx.url.indexOf('/liveness') !== -1 || ctx.url.indexOf('/readiness') !== -1) {
      await next();
      return;
    }
    // 获取配置信息
    const {config} = ctx.app;
    // 返回跳转地址
    const loginURI = `${ctx.getCookieDomain(ctx)}/admin/login`;
    // 获取根域的用户状态sid
    const amsid = ctx.cookies.get('amsid');
    console.log('loginURI = ', loginURI);
    console.log('amsid = ', amsid);
    // 用户未登录
    if (!amsid) {
      if (ctx.url.indexOf('/api/') !== -1) {
        ctx.throw(config.errors.NoLogin_Error, 'user nologin');
      }
      console.log('redirect');
      return ctx.redirect(loginURI);
    }
    // 获取用户登录token
    const loginData = await ctx.helper.redis(amsid);
    // 用户未登录
    if (!loginData) {
      if (ctx.url.indexOf('/api/') !== -1) {
        ctx.throw(config.errors.NoLogin_Error, 'user nologin');
      }
      return ctx.redirect(loginURI);
    }
    // 用户已登录
    const loginInfo = JSON.parse(loginData);
    ctx.state.token = loginInfo.token;
    await next();
  };
};
