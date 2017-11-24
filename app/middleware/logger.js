'use strict';

/**
 * 访问日志
 */
module.exports = () => {
  return async function logger(ctx, next) {
    // 请求方法
    const method = `Method=${ctx.method}`;
    // 访问主机
    const host = `Host=${ctx.headers['host']}`;
    // 访问路径
    const url = `Url=${ctx.url}`;
    // 客户端IP
    const clientIp = `ClientIp=${ctx.ip}`;
    // 客户端信息
    const userAgent = `UserAgent=${ctx.headers['user-agent']}`;
    // 请求body
    const requestBody = `RequestBody=${JSON.stringify(ctx.request.body)}`;

    const loggerText = `${method}${host}${url}${clientIp}${userAgent}${requestBody}`;
    ctx.app.logger.info(loggerText);
    await next();
  };
};
