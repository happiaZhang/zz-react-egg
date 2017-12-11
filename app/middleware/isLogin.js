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
    const {redis, logger} = ctx.app;
    try {
      // 获取根域的用户状态sid
      const amsid = ctx.cookies.get('amsid');
      // 获取用户登录token
      const loginData = await redis.get(amsid);
      const loginInfo = JSON.parse(loginData);
      ctx.state.token = loginInfo.token;
    } catch (error) {
      logger.info('not logged in');
      await ctx.redirectLogin();
      return;
    }
    await next();
  };
};
