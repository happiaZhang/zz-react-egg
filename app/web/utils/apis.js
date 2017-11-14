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
  const operId = qs.operId;
  const isEmpty = validate.isEmpty(operId.trim());
  qs.operId = isEmpty ? '' : parseInt(operId);
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
const getHostInfoByID = function(id) {
  const payload = {
    url: `/api/icp-admin/filing-admin/host-info/${id}`
  };
  return genPromise(payload, 'getHostInfoByID');
};

// 获取网站信息
const getWebsiteInfoByID = function(id) {
  const payload = {
    url: `/api/icp-admin/filing-admin/all-website-info/${id}`
  };
  return genPromise(payload, 'getWebsiteInfoByID');
};

// 设置初审验证
const setInitVerify = function(data) {
  const payload = {
    url: '/api/icp-admin/filing-admin/filing-init-verify',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setInitVerify');
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
const getCurtainInfo = (id) => {
  const payload = {
    url: `/api/icp-admin/filing-admin/curtain-info/${id}`
  };
  return genPromise(payload, 'getCurtainInfo');
};

// 审核幕布驳回
const setCurtainRejection = (data) => {
  const payload = {
    url: '/api/icp-admin/filing-admin/curtain-rejection',
    method: 'POST',
    data
  };
  return genPromise(payload, 'setCurtainRejection');
};

// 获取主体资料信息
const getHostMaterial = function(id) {
  const payload = {
    url: `/api/icp-admin/filing-admin/host-info-material/${id}`
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

export default {
  getAdminInfo,
  getHostInfoByID,
  getWebsiteInfoByID,
  setInitVerify,
  getDispatch,
  getTableData,
  setCurtainDelivery,
  getCurtainInfo,
  setCurtainRejection,
  getHostMaterial,
  getHostRevokeInfo,
  getSiteRevokeInfo,
  getAccessRevokeInfo
};
