export const LOADING = 'loading';
export const LOADED = 'loaded';
export const FILING_TYPE = {
  1: '首次备案',
  2: '新增网站',
  3: '新增接入',
  4: '备案变更',
  5: '注销主体',
  6: '注销网站',
  7: '取消接入'
};
export const QUERY_TYPE = [
  {value: 3, text: '全部'},
  {value: 4, text: '首次备案/新增网站/新增接入'},
  {value: 5, text: '变更主体/变更网站'},
  {value: 1, text: '注销主体/注销网站'},
  {value: 2, text: '取消接入'}
];
export const QUERY_STATUS = {
  '1': [20001, 20002, 20003, 30001, 30002, 30003],
  '11': [20001, 30001],
  '12': [20002, 30002],
  '13': [20003, 30003],
  '2': [40001, 40002, 40003],
  '21': [40001],
  '22': [40002],
  '23': [40003]
};
export const FILING_STATUS = [
  {value: 10000, text: '开始备案'},
  {value: 10010, text: '填写主体信息'},
  {value: 10020, text: '填写网站信息'},
  {value: 10030, text: '提交备案资料'},
  {value: 10040, text: '待初审'},
  {value: 10050, text: '办理拍照'},
  {value: 10055, text: '待邮寄'},
  {value: 10057, text: '已邮寄'},
  {value: 10060, text: '初审驳回'},
  {value: 10070, text: '待审核幕布'},
  {value: 10080, text: '幕布驳回'},
  {value: 10090, text: '待管局审核'},
  {value: 10100, text: '备案完成'},
  {value: 10110, text: '备案失败'},
  {value: 10120, text: '撤销备案'},
  {value: 20000, text: '未提交'},
  {value: 20001, text: '待处理'},
  {value: 20002, text: '待管局审核'},
  {value: 20003, text: '审核通过'},
  {value: 20004, text: '审核失败'},
  {value: 30000, text: '未提交'},
  {value: 30001, text: '待处理'},
  {value: 30002, text: '待管局审核'},
  {value: 30003, text: '审核通过'},
  {value: 30004, text: '审核失败'},
  {value: 40000, text: '未提交'},
  {value: 40001, text: '待处理'},
  {value: 40002, text: '待管局审核'},
  {value: 40003, text: '审核通过'},
  {value: 40004, text: '审核失败'},
  {value: 1, text: '待处理'},
  {value: 2, text: '待管局审核'},
  {value: 3, text: '审核通过'}
];
export const genOperations = (elm) => {
  const {status, filingType} = elm;
  const operations = [];

  switch (status) {
    case 10040:
      operations.push({type: filingType === 4 ? 'MODIFY_QUERY' : 'TRIAL_QUERY', text: '查看'});
      break;
    case 10055:
      operations.push({type: 'DELIVERY', text: '填写快递单号'});
      break;
    case 10070:
      operations.push({type: 'VERIFY_QUERY', text: '查看'});
      break;
    case 10090:
      operations.push({type: 'AUDIT_RESOLVE', text: '通过，填写备案号'});
      operations.push({type: 'AUDIT_REJECT', text: '驳回'});
      break;
    case 10100:
      operations.push({type: 'AUDIT_QUERY', text: '查看'});
      break;
    case 20001:
      operations.push({type: 'REVOKE_HOST_QUERY', text: '查看'});
      break;
    case 30001:
      operations.push({type: 'REVOKE_SITE_QUERY', text: '查看'});
      break;
    case 40001:
      operations.push({type: 'REVOKE_ACCESS_RESOLVE', text: '通过'});
      operations.push({type: 'REVOKE_ACCESS_REJECT', text: '驳回'});
      break;
    case 20002:case 30002:
      operations.push({type: 'REVOKE_DONE', text: '通过'});
      operations.push({type: 'REVOKE_FAIL', text: '驳回'});
      break;
  }

  return operations;
};
export const handleOperations = (type, data, history, func) => {
  const {operId, siteId} = data;
  switch (type) {
    case 'TRIAL_QUERY':
      history.push(`/trial/detail/${operId}`);
      break;
    case 'MODIFY_QUERY':
      history.push(`/modify/detail/${operId}`);
      break;
    case 'DELIVERY':
      func(operId);
      break;
    case 'VERIFY_QUERY':
      history.push(`/verify/detail/${operId}`);
      break;
    case 'AUDIT_RESOLVE':
      history.push(`/audit/resolve/${operId}`);
      break;
    case 'AUDIT_REJECT':
      history.push(`/audit/reject/${operId}`);
      break;
    case 'AUDIT_QUERY':
      history.push(`/audit/detail/${operId}`);
      break;
    case 'REVOKE_HOST_QUERY':
      history.push(`/revoke/host/${operId}`);
      break;
    case 'REVOKE_SITE_QUERY':
      history.push(`/revoke/site/${operId}/${siteId}`);
      break;
    case 'REVOKE_ACCESS_RESOLVE':
      history.push(`/revoke/access/resolve/${operId}/${siteId}`);
      break;
    case 'REVOKE_ACCESS_REJECT':
      history.push(`/revoke/access/reject/${operId}/${siteId}`);
      break;
    case 'REVOKE_DONE':
      func(data, true);
      break;
    case 'REVOKE_FAIL':
      func(data, false);
      break;
  }
};
export const AUDIT_INDUSTRY = {
  news: '新闻',
  bss: '电子公告服务',
  culture: '文化',
  publish: '出版',
  education: '教育',
  medicalCare: '医疗',
  television: '广播电影电视节目'
};
