'use strict';

/**
 * 判断是否为登录用户
 */
module.exports = () => {

	return async function loginer(ctx, next) {
		//登录页
		const loginURI = `https://admin.cloud.wanda.cn/admin/login`;
		const permissionURI = `https://crm-finance-invoice.cloud.wanda.cn`;

		//获取根域的用户状态sid
		const amsid = ctx.cookies.get('amsid');
		//用户未登录
		if (!amsid) {
			ctx.redirect(loginURI);
			return;
		}
		//获取用户登录token
		const loginData = await ctx.helper.redis(amsid);
		//用户未登录
		if (!loginData) {
			ctx.redirect(loginURI);
			return;
		}
		//判断用户权限
		const loginInfo = JSON.parse(loginData);
		//判断用户是否有管理权限
		const result = await ctx.app.curl(`${ctx.app.config.adminHost}/userrest/judgePermission`, {
			method: 'GET',
			data: {
				token: loginInfo.token,
				permissionStr: permissionURI,
			},
			dataType: 'json',
		});
		//用户没有权限
		if (result.status != 200 || !result.data || result.data.code != 0) {
			ctx.redirect(loginURI);
			return;
		}
		ctx.session.token = loginInfo.token;
		await next();
	};
};

