import http from './http';
import validate from './validate';
import * as types from './constants';

let dispatch = null;

const getDispatch = (func) => {
  dispatch = func;
};

const genPromise = (payload, key) => {
  dispatch({type: types.LOADING, payload: key});
  return new Promise(function(resolve, reject) {
    // 调用API
    http.fetch(payload).then(data => {
      dispatch({type: types.LOADED, payload: key});
      resolve(data);
    }).catch(err => {
      dispatch({type: types.LOADED, payload: key});
      reject(err);
    });
  });
};

// 生成query string
const genQueryString = (params) => {
  const qs = {...params};
  Object.keys(qs).forEach(k => {
    if (k.toUpperCase() === 'OPERID') {
      const operId = qs[k];
      qs[k] = validate.isEmpty(operId) ? '' : parseInt(operId);
    }
  });
  return validate.encode(qs);
};

// 获取用户信息
const getAdminInfo = function() {
  const payload = {
    url: '/api/admin/view'
  };
  return genPromise(payload, 'getAdminInfo');
};

// 获取非注销数据
const getInfoSummaryNonRevoked = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getInfoSummaryNonRevoked?${queryString}`
  };
  return genPromise(payload, 'getInfoSummaryNonRevoked');
};

// 获取注销数据
const getInfoSummaryRevoked = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getInfoSummaryRevoked?${queryString}`
  };
  return genPromise(payload, 'getInfoSummaryRevoked');
};

// 获取初审详情信息
const getTrialInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getTrialInfo?${queryString}`
  };
  return genPromise(payload, 'getTrialInfo');
};

// 获取审核幕布详情信息
const getVerifyInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getVerifyInfo?${queryString}`
  };
  return genPromise(payload, 'getVerifyInfo');
};

// 获取管局通过详情信息
const getAuditResolveInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getAuditResolveInfo?${queryString}`
  };
  return genPromise(payload, 'getAuditResolveInfo');
};

// 导出excel文件
const getExcel = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getExcel?${queryString}`
  };
  return genPromise(payload, 'getExcel');
};

// 设置初审状态
const setTrailStatus = function(data) {
  const payload = {
    url: '/api/icp-admin/setTrailStatus',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setTrailStatus');
};

// 邮寄幕布
const setCurtainDeliveryInfo = function(data) {
  const payload = {
    url: '/api/icp-admin/setCurtainDeliveryInfo',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setCurtainDeliveryInfo');
};

// 获取幕布邮寄信息
const getCurtainInfo = (params) => {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getCurtainInfo?${queryString}`
  };
  return genPromise(payload, 'getCurtainInfo');
};

// 设置备案状态
const setFilingStatus = function(data) {
  const payload = {
    url: '/api/icp-admin/setFilingStatus',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setFilingStatus');
};

// 设置主体或网站备案号
const setFilingNo = function(data) {
  const payload = {
    url: '/api/icp-admin/setFilingNo',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setFilingNo');
};

// 获取注销主体信息
const getHostRevokeInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getHostRevokeInfo?${queryString}`
  };
  return genPromise(payload, 'getHostRevokeInfo');
};

// 获取注销网站信息
const getSiteRevokeInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getSiteRevokeInfo?${queryString}`
  };
  return genPromise(payload, 'getSiteRevokeInfo');
};

// 获取取消接入信息
const getSiteAccesscancelledInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/getSiteAccesscancelledInfo?${queryString}`
  };
  return genPromise(payload, 'getSiteAccesscancelledInfo');
};

export default {
  getAdminInfo,
  getDispatch,
  getTrialInfo,
  getVerifyInfo,
  getAuditResolveInfo,
  getExcel,
  getInfoSummaryNonRevoked,
  getInfoSummaryRevoked,
  setTrailStatus,
  setCurtainDeliveryInfo,
  getCurtainInfo,
  setFilingStatus,
  setFilingNo,
  getHostRevokeInfo,
  getSiteRevokeInfo,
  getSiteAccesscancelledInfo
};
