import http from '../utils/http';
import validate from '../utils/validate';

const USER_INFO_ID = '__USER_INFO__';
const setUserInfo = function(data) {
  const userInfo = JSON.stringify(data);
  document.getElementById(USER_INFO_ID).value = userInfo;
};

const getUserInfo = function() {
  const userInfo = document.getElementById(USER_INFO_ID).value;
  if (validate.isEmpty(userInfo)) return userInfo;
  return JSON.parse(userInfo);
};

const getCheckPerson = function() {
  const userInfo = getUserInfo();
  if (validate.isEmpty(userInfo)) return 'Dev';
  return userInfo.account;
};

// 获取用户信息
const getAdminInfo = function() {
  const payload = {
    url: '/api/icp-admin/getAdminInfo'
  };
  return http.genPromise(payload, 'getAdminInfo');
};

// 获取非注销数据
const getInfoSummaryNonRevoked = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getInfoSummaryNonRevoked?${queryString}`
  };
  return http.genPromise(payload, 'getInfoSummaryNonRevoked');
};

// 获取注销数据
const getInfoSummaryRevoked = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getInfoSummaryRevoked?${queryString}`
  };
  return http.genPromise(payload, 'getInfoSummaryRevoked');
};

// 获取初审详情信息
const getTrialInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getTrialInfo?${queryString}`
  };
  return http.genPromise(payload, 'getTrialInfo');
};

// 获取审核幕布详情信息
const getVerifyInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getVerifyInfo?${queryString}`
  };
  return http.genPromise(payload, 'getVerifyInfo');
};

// 获取管局通过详情信息
const getAuditResolveInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getAuditResolveInfo?${queryString}`
  };
  return http.genPromise(payload, 'getAuditResolveInfo');
};

// 导出excel文件
const export2Excel = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getExcel?${queryString}`
  };
  return http.genPromise(payload, 'export2Excel');
};

// 设置初审状态
const setTrailStatus = function(data) {
  data.checkPerson = getCheckPerson();
  const payload = {
    url: '/api/icp-admin/setTrailStatus',
    method: 'POST',
    data
  };
  return http.genPromise(payload, 'setTrailStatus');
};

// 邮寄幕布
const setCurtainDeliveryInfo = function(data) {
  data.checkPerson = getCheckPerson();
  const payload = {
    url: '/api/icp-admin/setCurtainDeliveryInfo',
    method: 'POST',
    data
  };
  return http.genPromise(payload, 'setCurtainDeliveryInfo');
};

// 获取幕布邮寄信息
const getCurtainInfo = (params) => {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getCurtainInfo?${queryString}`
  };
  return http.genPromise(payload, 'getCurtainInfo');
};

// 设置备案状态
const setFilingStatus = function(data) {
  data.checkPerson = getCheckPerson();
  const payload = {
    url: '/api/icp-admin/setFilingStatus',
    method: 'POST',
    data
  };
  return http.genPromise(payload, 'setFilingStatus');
};

// 设置主体或网站备案号
const setFilingNo = function(data) {
  data.checkPerson = getCheckPerson();
  const payload = {
    url: '/api/icp-admin/setFilingNo',
    method: 'POST',
    data
  };
  return http.genPromise(payload, 'setFilingNo');
};

// 获取注销主体信息
const getHostRevokeInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getHostRevokeInfo?${queryString}`
  };
  return http.genPromise(payload, 'getHostRevokeInfo');
};

// 获取注销网站信息
const getSiteRevokeInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getSiteRevokeInfo?${queryString}`
  };
  return http.genPromise(payload, 'getSiteRevokeInfo');
};

// 获取取消接入信息
const getSiteAccesscancelledInfo = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getSiteAccesscancelledInfo?${queryString}`
  };
  return http.genPromise(payload, 'getSiteAccesscancelledInfo');
};

export default {
  getAdminInfo,
  getTrialInfo,
  getVerifyInfo,
  getAuditResolveInfo,
  export2Excel,
  getInfoSummaryNonRevoked,
  getInfoSummaryRevoked,
  setTrailStatus,
  setCurtainDeliveryInfo,
  getCurtainInfo,
  setFilingStatus,
  setFilingNo,
  getHostRevokeInfo,
  getSiteRevokeInfo,
  getSiteAccesscancelledInfo,
  setUserInfo
};
