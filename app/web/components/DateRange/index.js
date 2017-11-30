import styles from './index.scss';
import React from 'react';
import Datepicker from '../Datepicker';
import datetime from '../Datepicker/datetime';

/**
 * @param {string | number} startDate
 * @param {string | number} endDate
 * @param {number} width
 * @param {function} onChange
 * @param {boolean} clear: default value is true
 */

class DateRange extends React.Component {
  static defaultProps = {
    paddingRight: 27
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.formatDate(props.startDate, props.endDate)
    };
  }

  initValue = () => ({startDate: '', endDate: ''});

  componentWillReceiveProps(nextProps) {
    const {startDate, endDate} = nextProps;
    if (startDate !== this.props.startDate || endDate !== this.props.endDate) {
      this.setState({...this.formatDate(startDate, endDate)});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  formatDate = (startDate, endDate) => {
    const {isValid: sV, time: sT} = datetime.validDate(startDate);
    const {isValid: eV, time: eT} = datetime.validDate(endDate);
    const result = this.initValue();
    if (sV && eV) {
      result.startDate = sT;
      result.endDate = eT;
    }
    return result;
  };

  handleChange = ({startDate, endDate}) => {
    this.setState({startDate, endDate});
    this.getChange({startDate, endDate});
  };

  handleClear = () => {
    const initValue = this.initValue();
    this.setState(initValue);
    this.getChange(initValue);
  };

  getChange = ({startDate, endDate}) => {
    const {onChange} = this.props;
    onChange && onChange({
      startDate: datetime.format(new Date(startDate), datetime.DEFAULT_OUTPUT_FORMAT),
      endDate: datetime.format(new Date(endDate), datetime.DEFAULT_OUTPUT_FORMAT)
    });
  };

  render() {
    const {width, paddingRight, clear} = this.props;
    const {startDate, endDate} = this.state;
    const style = {paddingRight};
    if (width) style.width = width;
    const props = {
      type: datetime.RANGE,
      showIcon: false,
      onChange: this.handleChange,
      startDate,
      endDate
    };
    let classNames = styles.dateRange;
    if (startDate !== '' && clear) classNames += ' ' + styles.hover;
    return (
      <div className={classNames} style={style}>
        <div className={styles.date}><Datepicker {...props} value={startDate} /></div>
        <div className={styles.date}><Datepicker {...props} value={endDate} /></div>
        <svg className={`${styles.icon} ${styles.calendarIcon}`}>
          <path d='M12 0h2v2.7h-2zM3 0h2v2.7H3z' />
          <path d='M0 2v17h17V2H0zm15 15H2V7h13v10z' />
          <path d='M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z' />
        </svg>
        <a className={`${styles.icon} ${styles.clearIcon}`} onClick={this.handleClear}>&times;</a>
      </div>
    );
  }
}

export default DateRange;
