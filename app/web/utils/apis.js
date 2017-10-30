import http from './http';
import validate from './validate';
import * as types from '../constants/types';

let dispatch = null;

const getDispatch = (func) => {
  dispatch = func;
};

const genPromise = (payload, key) => {
  return new Promise(function(resolve, reject) {
    dispatch({type: types.LOADING, payload: key});
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

// 获取备案初审列表
const getRecordTrailList = function(params) {
  const qs = {...params};
  const operId = qs.operId;
  const isEmpty = validate.isEmpty(operId.trim());
  qs.operId = isEmpty ? '' : parseInt(operId);
  const queryString = validate.encode(qs);
  const payload = {
    url: `/api/icp-admin/filing-admin/info-summary?${queryString}`
  };
  return genPromise(payload, 'getRecordTrailList');
};

export default {
  getAdminInfo,
  getHostInfoByID,
  getWebsiteInfoByID,
  setInitVerify,
  getRecordTrailList,
  getDispatch
};
