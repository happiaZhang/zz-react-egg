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
    http.fetch(payload).then((result) => {
      dispatch({type: types.LOADED, payload: key});
      switch (result.code) {
        case 0:
          resolve(result.data);
          break;
        default:
          reject();
          break;
      }
    }).catch(() => {
      dispatch({type: types.LOADED, payload: key});
      reject();
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

// 获取注销网站信息
const getWebsiteInfo = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/website-info?${queryString}`
  };
  return genPromise(payload, 'getWebsiteInfo');
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

// 获取表格数据
const getTableData = function(params) {
  const queryString = genQueryString(params);
  const payload = {
    url: `/api/icp-admin/filing-admin/info-summary?${queryString}`
  };
  return genPromise(payload, 'getTableData');
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

// 设置主体备案号
const setHostNo = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/filing-hostno',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setHostNo');
};

// 设置网站备案号
const setSiteNo = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/filing-siteno',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setSiteNo');
};

// 设置主体注销状态
const setHostRevoke = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/host-revoke',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setHostRevoke');
};

// 设置网站注销状态
const setSiteRevoke = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/site-revoke',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setSiteRevoke');
};

// 设置网站备案号
const setAccessRevoke = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/site-access-cancel',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setAccessRevoke');
};

export default {
  getAdminInfo,
  getHostInfoByID,
  getWebsiteInfoByID,
  getWebsiteInfo,
  setFilingStatus,
  getDispatch,
  getTableData,
  setCurtainDelivery,
  getCurtainInfo,
  getHostMaterial,
  getHostRevokeInfo,
  getSiteRevokeInfo,
  getAccessRevokeInfo,
  setHostNo,
  setSiteNo,
  setHostRevoke,
  setSiteRevoke,
  setAccessRevoke
};
