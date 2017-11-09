'use strict';

/**
 * 统一异常处理
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', error, this);

      const errorCode = error.status || 500;
      const errorMsg = (ctx.app.config.env === 'prod' && errorCode === 500) ? 'Internal Server Error' : error.message;

      // 统一返回
      ctx.helper.json(errorCode, errorMsg);
    }
  };
};
