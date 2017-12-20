import http from '../utils/http';

// 获取用户审核状态
const getUserVerifyRecord = function(params) {
  const queryString = http.genQueryString(params);
  const payload = {
    url: `/api/acc-admin/getUserVerifyRecord?${queryString}`
  };
  return http.genPromise(payload, 'getUserVerifyRecord');
};

// 设置用户审核状态
const setUserVerifyRecord = function(data) {
  const payload = {
    url: '/api/acc-admin/setUserVerifyRecord',
    method: 'POST',
    data
  };
  return http.genPromise(payload, 'setUserVerifyRecord');
};

export default {
  getUserVerifyRecord,
  setUserVerifyRecord
};
