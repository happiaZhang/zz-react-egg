import styles from './index.scss';
import React from 'react';
import BaseContainer from '../BaseContainer';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import DateRange from '../../components/DateRange';
import Input from '../../components/Input';
import datetime from '../../components/Datepicker/datetime';
import {QUERY_TYPE, QUERY_STATUS} from '../../utils/constants';
import apis from '../../utils/apis';
import validate from '../../utils/validate';

class Query extends BaseContainer {
  constructor(props) {
    super(props);
    const {startTime, endTime} = this.lastWeek();
    this.state.queryType = 3;
    this.state.startTime = startTime;
    this.state.endTime = endTime;
    this.title = '备案查询';
    this.selectAll = [];
    this.selectOptions = this.genOptions();
    this.setFilter = this.genFilter;
    this.loadFunc = apis.getRevoked;
  }

  // 获取最近一周日期
  lastWeek = () => {
    const startTime = new Date();
    datetime.add(startTime, -7);
    return {
      startTime: datetime.format(startTime, datetime.DEFAULT_OUTPUT_FORMAT),
      endTime: datetime.format(new Date(), datetime.DEFAULT_OUTPUT_FORMAT)
    };
  };

  // 改变备案类型
  changeQueryType = (queryType) => {
    switch (queryType) {
      case 3:
        this.selectAll = [];
        this.selectOptions = this.genOptions();
        break;
      case 1:case 2:
        this.selectAll = [1, 2, 3];
        this.selectOptions = this.genOptions();
        break;
      case 4:case 5:
        this.selectAll = [10040, 10060, 10055, 10070, 10080, 10090, 10100];
        this.selectOptions = this.genOptions();
        break;
    }
    let filingType = '';
    if (queryType === 4) filingType = [1, 2, 3];
    if (queryType === 5) filingType = [4];
    this.setState({queryType, status: '', filingType});
  }

  // 格式化请求参数 (overwrite)
  convertParams = (params) => {
    const data = {...params};
    const {queryType, status, startTime} = data;
    const statusEmpty = validate.isEmpty(status);
    // 注销主体/注销网站/取消接入
    if (queryType === 1 || queryType === 2) data.status = QUERY_STATUS[`${queryType}${status}`];
    // 首次备案/新增网站/新增接入/变更主体/变更网站
    if ((queryType === 4 || queryType === 5) && statusEmpty) data.status = this.selectAll;
    // 日期精确到秒
    if (startTime !== '') {
      data.startTime += ' 00:00:00';
      data.endTime += ' 23:59:59';
    }
    return data;
  };

  // 改变下拉框状态 (overwrite)
  changeStatus = (status) => {
    this.setState({status});
  };

  // 改变主体名称
  changeHostname = (hostname) => {
    this.setState({hostname});
  };

  // 改变关联域名
  changeWebsite = (website) => {
    this.setState({website});
  };

  // 改变查询日期
  changeTime = ({startDate: startTime, endDate: endTime}) => {
    this.setState({startTime, endTime});
  };

  genFilter = () => {
    const {queryType, status, startTime, endTime, hostname, website} = this.state;
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
        {
          label: '备案状态',
          component: Select,
          data: this.selectOptions,
          style: {width: 300},
          onChangeValue: this.changeStatus,
          value: status,
          disable: queryType === 3
        },
        {
          label: '主办单位',
          component: Input,
          style: {width: 300},
          onChange: this.changeHostname,
          value: hostname
        }
      ],
      [
        {
          label: '关联域名',
          component: Input,
          style: {width: 300},
          onChange: this.changeWebsite,
          value: website
        },
        {
          label: '最近更新时间',
          component: DateRange,
          onChange: this.changeTime,
          startDate: startTime,
          endDate: endTime
        },
        {
          component: Button,
          onClick: this.loadTableData,
          text: '查询'
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
