import styles from './index.scss';
import React from 'react';
import BaseContainer from '../BaseContainer';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import DateRange from '../../components/DateRange';
import Input from '../../components/Input';
import {REVOKE_TYPE} from '../RevokeHost';
import datetime from '../../components/Datepicker/datetime';

const QUERY_TYPE = [
  {value: 4, text: '全部'},
  {value: 1, text: '首次备案/新增网站/新增接入'},
  {value: 1, text: '变更主体/变更网站'},
  {value: 2, text: '注销主体/注销网站'},
  {value: 3, text: '取消接入'}
];

const FILING_STATUS = [
  {value: 10040, text: '待初审'},
  {value: 10050, text: '待邮寄'},
  {value: 10060, text: '初审驳回'},
  {value: 10070, text: '待审核'},
  {value: 10080, text: '幕布驳回'},
  {value: 10090, text: '待管局审核'},
  {value: 10100, text: '已完成'},
  {value: 10110, text: '备案失败'},
  {value: 10120, text: '撤销备案'},
  {value: 20001, text: '待处理'},
  {value: 20002, text: '待管局审核'},
  {value: 30001, text: '待处理'},
  {value: 30002, text: '待管局审核'},
  {value: 40001, text: '待处理'},
  {value: 40002, text: '待管局审核'}
];

class Query extends BaseContainer {
  constructor(props) {
    super(props);
    const {startTime, endTime} = this.lastWeek();
    this.type = 'Query';
    this.state.queryType = 4;
    this.state.startTime = startTime;
    this.state.endTime = endTime;
    this.title = '备案查询';
    this.errorMsg = '备案查询失败，请重新重试';
    this.selectOptions = FILING_STATUS;
    this.operations = this.setOperations;
    this.genFilter = this.genFilter;
  }

  // overwrite
  componentWillMount() {}

  // overwrite
  convertParams = (params) => {
    let {startTime, endTime} = params;
    if (startTime !== '') {
      startTime += ' 00:00:00';
      endTime += ' 23:59:59';
    }
    return {...params, startTime, endTime};
  };

  // 获取最近一周日期
  lastWeek = () => {
    const startTime = new Date();
    datetime.add(startTime, -7);
    return {
      startTime: datetime.format(startTime, datetime.DEFAULT_OUTPUT_FORMAT),
      endTime: datetime.format(new Date(), datetime.DEFAULT_OUTPUT_FORMAT)
    };
  };

  setOperations = (elm) => {
    const {status} = elm;
    if (status === 10040) {
      return [{type: 'TRIAL_QUERY', text: '查看'}];
    } else if (status === 10050) {
      return [{type: 'DELIVERY', text: '填写快递单号'}];
    } else if (status === 10070) {
      return [{type: 'VERIFY_QUERY', text: '查看'}];
    } else if (status === 10090) {
      return [
        {type: 'AUDIT_RESOLVE', text: '通过，填写备案号'},
        {type: 'AUDIT_REJECT', text: '驳回'}
      ];
    } else if (status === 10100) {
      return [{type: 'AUDIT_QUERY', text: '查看'}];
    } else if (status === 20001 || status === 30001 || status === 40001) {
      return [{type: REVOKE_TYPE[status], text: '查看'}];
    } else if (status === 20002 || status === 30002 || status === 40002) {
      return [{type: REVOKE_TYPE[status], text: '已完成'}];
    }
  };

  genFilter = () => {
    const {queryType, startTime, endTime} = this.state;
    const FILTER_ITEMS = [
      [
        {
          label: '备案类型',
          component: Select,
          data: QUERY_TYPE,
          style: {width: 300},
          onChangeValue: this.changeQueryType,
          value: queryType
        },
        /*
        {
          label: '备案状态',
          component: Select,
          data: this.selectOptions,
          style: {width: 300},
          onChangeValue: this.changeStatus,
          value: status
        },
        */
        {label: '主办单位或主办人名称', component: Input, style: {width: 300}, onChange: this.changeHostname},
        {label: '关联域名', component: Input, style: {width: 300}, onChange: this.changeWebsite}

      ],
      [
        {
          label: '最近更新时间',
          component: DateRange,
          onChange: this.changeTime,
          startDate: startTime,
          endDate: endTime
        }
      ]
    ];

    const rows = [];
    FILTER_ITEMS.forEach((r, j) => {
      const cols = [];
      r.forEach((props, i) => {
        cols.push(
          <div key={i} className={styles.col}>
            <FormGroup {...props} />
          </div>
        );
      });
      rows.push(<div key={j} className={styles.row}>{cols}</div>);
    });

    return (
      <div className={styles.table}>
        {rows}
      </div>
    );
  };
}

export default Query;
