import styles from './index.scss';
import React from 'react';
import BaseContainer from '../BaseContainer';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import DateRange from '../../components/DateRange';
import Input from '../../components/Input';

const RECORD_TYPE = [
  {value: '', text: '全部'},
  {value: 1, text: '首次备案/新增网站/新增接入'},
  {value: 2, text: '变更主体/变更网站'},
  {value: 3, text: '注销主体/注销网站'},
  {value: 4, text: '取消接入'}
];
const RECORD_STATUS = [
  {value: '', text: '全部'},
  {value: 10040, text: '待初审'},
  {value: 10060, text: '初审驳回'},
  {value: 10050, text: '待邮寄'},
  {value: 10070, text: '待审核'},
  {value: 10080, text: '幕布驳回'},
  {value: 10090, text: '待管局审核'},
  {value: 10100, text: '已完成'}
];

class Query extends BaseContainer {
  constructor(props) {
    super(props);
    this.isQuery = true;
    this.title = '备案查询';
    this.selectOptions = RECORD_STATUS;
    this.errorMsg = '备案查询失败，请重新重试';
    this.operations = [{type: 'TRAIL', text: '查看'}];
    this.genFilter = this.genFilter;
  }

  genFilter = () => {
    const data1 = [
      {value: '', text: '全部'},
      {value: '1', text: '首次备案/新增网站/新增接入'},
      {value: '2', text: '变更主体/变更网站'},
      {value: '3', text: '注销主体/注销网站'},
      {value: '4', text: '取消接入'}
    ];

    return (
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <FormGroup label='备案类型' component={Select} data={data1} style={{width: 300}} />
          </div>
          <div className={styles.col}>
            <FormGroup label='备案状态' component={Select} data={data1} style={{width: 300}} />
          </div>
          <div className={styles.col}>
            <FormGroup label='最近更新时间' component={DateRange} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <FormGroup label='申请ID' component={Input} style={{width: 300}} />
          </div>
          <div className={styles.col}>
            <FormGroup label='主办单位或主办人名称' component={Input} style={{width: 300}} />
          </div>
          <div className={styles.col}>
            <FormGroup label='关联域名' component={Input} style={{width: 300}} />
          </div>
        </div>
      </div>
    );
  };
}

export default Query;
