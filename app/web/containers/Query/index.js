import styles from './index.scss';
import React from 'react';
import BaseContainer from '../BaseContainer';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import DateRange from '../../components/DateRange';
import Input from '../../components/Input';
import validate from '../../utils/validate';

const FILING_TYPE = [
  {value: '', text: '全部'},
  {value: 1, text: '首次备案/新增网站/新增接入'},
  {value: 2, text: '变更主体/变更网站'},
  {value: 3, text: '注销主体/注销网站'},
  {value: 4, text: '取消接入'}
];
const FILING_STATUS = [
  {value: '', text: '全部', recordType: [1, 2, 3, 4]},
  {value: 10040, text: '待初审', recordType: [1, 2]},
  {value: 10060, text: '初审驳回', recordType: [1, 2]},
  {value: 10050, text: '待邮寄', recordType: [1, 2]},
  {value: 10070, text: '待审核', recordType: [1, 2]},
  {value: 10080, text: '幕布驳回', recordType: [1, 2]},
  {value: 10090, text: '待管局审核', recordType: [1, 2, 3, 4]},
  {value: 10100, text: '已完成', recordType: [1, 2, 3, 4]}
];

class Query extends BaseContainer {
  constructor(props) {
    super(props);
    this.isQuery = true;
    this.title = '备案查询';
    this.errorMsg = '备案查询失败，请重新重试';
    this.operations = [{type: 'TRAIL', text: '查看'}];
    this.setSelectOptions();
    this.genFilter = this.genFilter;
    this.setSelectOptions = this.setSelectOptions;
  }

  // overwrite
  componentWillMount() {}

  setSelectOptions = (filingType = '') => {
    if (typeof filingType === 'string') {
      this.selectOptions = [...FILING_STATUS];
      this.selectAll = this.setSelectAll();
    } else {
      this.selectOptions.length = 0;
      this.selectAll.length = 0;
      FILING_STATUS.forEach(s => {
        const {recordType, value} = s;
        if (recordType.findIndex(f => f === filingType) > -1) {
          this.selectOptions.push(s);
          if (!validate.isEmpty(value)) this.selectAll.push(value);
        }
      });
    }
  };

  genFilter = (state) => {
    const {filingType} = state;
    const FILTER_ITEMS = [
      [
        {
          label: '备案类型',
          component: Select,
          data: FILING_TYPE,
          style: {width: 300},
          onChangeValue: this.changeFilingType,
          value: filingType
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
        {label: '主办单位或主办人名称', component: Input, style: {width: 300}},
        {label: '关联域名', component: Input, style: {width: 300}}

      ],
      [
        {label: '最近更新时间', component: DateRange}
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
