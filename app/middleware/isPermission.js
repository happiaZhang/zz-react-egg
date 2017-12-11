const querystring = require('querystring');

/**
 * 判断是否为登录用户
 */
module.exports = () => {
  return async function isPermission(ctx, next) {
    // 心跳机制-跳过权限判断
    if (ctx.url.indexOf('/liveness') !== -1 || ctx.url.indexOf('/readiness') !== -1) {
      await next();
      return;
    }
    const {config, logger} = ctx.app;// 获取配置信息
    // 返回跳转地址
    const permissionStr = config.permission.uri;
    // 判断用户权限
    const token = ctx.state.token;
    // 判断用户是否有管理权限
    const result = await ctx.fetch('/userrest/judgePermission', {
      host: config.adminHost,
      search: '?' + querystring.stringify({token, permissionStr}),
      method: 'GET'
    });
    // 用户没有权限
    if (result.status !== 200 || !result.data || result.data.code !== '0') {
      logger.info('no permission');
      await ctx.redirectLogin();
      return;
    }
    // 用户拥有权限
    await next();
  };
};
