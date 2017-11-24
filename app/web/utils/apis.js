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
    url: '/api/admin/get'
  };
  return genPromise(payload, 'getAdminInfo');
};

// 获取主体信息
const getHostInfoByID = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/host-info?${queryString}`
  };
  return genPromise(payload, 'getHostInfoByID');
};

// 获取网站信息
const getWebsiteInfoByID = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/all-website-info?${queryString}`
  };
  return genPromise(payload, 'getWebsiteInfoByID');
};

// 设置初审验证
const setFilingStatus = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/filing-status',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setFilingStatus');
};

// 获取非注销数据
const getNonRevoked = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/info-summary-non-revoked?${queryString}`
  };
  return genPromise(payload, 'getNonRevoked');
};

// 获取注销数据
const getRevoked = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/info-summary-revoked?${queryString}`
  };
  return genPromise(payload, 'getRevoked');
};

// 邮寄幕布
const setCurtainDelivery = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/curtain-delivery-info',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setCurtainDelivery');
};

// 获取幕布邮寄信息
const getCurtainInfo = (params) => {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/curtain-info?${queryString}`
  };
  return genPromise(payload, 'getCurtainInfo');
};

// 获取主体资料信息
const getHostMaterial = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/host-info-material?${queryString}`
  };
  return genPromise(payload, 'getHostMaterial');
};

// 获取注销主体信息
const getHostRevokeInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/host-revoke-info?${queryString}`
  };
  return genPromise(payload, 'getHostRevokeInfo');
};

// 获取注销网站信息
const getSiteRevokeInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/site-revoke-info?${queryString}`
  };
  return genPromise(payload, 'getSiteRevokeInfo');
};

// 获取取消接入信息
const getAccessRevokeInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/site-accesscancelled-info?${queryString}`
  };
  return genPromise(payload, 'getAccessRevokeInfo');
};

// 设置主体或网站备案号
const setFilingNo = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/filing-no',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setFilingNo');
};

export default {
  getAdminInfo,
  getHostInfoByID,
  getWebsiteInfoByID,
  setFilingStatus,
  getDispatch,
  getNonRevoked,
  getRevoked,
  setCurtainDelivery,
  getCurtainInfo,
  getHostMaterial,
  getHostRevokeInfo,
  getSiteRevokeInfo,
  getAccessRevokeInfo,
  setFilingNo
};
