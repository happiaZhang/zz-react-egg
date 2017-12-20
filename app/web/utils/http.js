import 'whatwg-fetch';
import validate from './validate';
import * as types from '../models/constants';

const fetchApi = self.fetch.bind(self);
const prefix = validate.prefix();
let dispatch = null;

const getDispatch = (func) => {
  dispatch = func;
};

const genModal = (payload) => {
  dispatch({type: types.MODAL, payload});
};

const genPromise = (payload, key) => {
  const {url, method = 'GET', data = {}} = payload;
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': validate.getCookie('csrfToken')
    },
    credentials: 'same-origin'
  };
  if (method === 'POST') opts.body = JSON.stringify(data);
  dispatch({type: types.LOADING, payload: key});
  return new Promise(function(resolve, reject) {
    // 调用API
    fetchApi(prefix + url, opts)
      .then(res => res.json())
      .then(json => {
        dispatch({type: types.LOADED, payload: key});
        const {code, msg, data} = json;
        if (code === 300) location.href = msg;
        code ? reject(msg) : resolve(data);
      }).catch(() => {
        dispatch({type: types.LOADED, payload: key});
        reject('网络连接失败，请稍候重试');
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

export default {
  getDispatch,
  genModal,
  genPromise,
  genQueryString
};
