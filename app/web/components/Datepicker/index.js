import styles from './index.scss';
import React from 'react';
import Calendar from './calendar';
import datetime from './datetime';

/**
 * @param {string} value
 * @param {string} format: the date's display format
 * @param {string} placeholder
 * @param {number} width
 * @param {boolean} showIcon: default value is true
 * @param {function} onChange: return selected date
 * @param {string} type: is one of two values [range, single]. default is single
 * @param {string | number} startDate: when type is range, this value is valid and its format is timestamp
 * @param {string | number} endDate: like startDate
 */

class Datepicker extends React.Component {
  static defaultProps = {
    format: datetime.DEFAULT_OUTPUT_FORMAT,
    placeholder: 'YYYY/MM/DD',
    showIcon: true,
    type: datetime.SINGLE
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isOpen: false,
      startDate: props.startDate,
      endDate: props.endDate,
      ...datetime.validDate(props.value, props.format)
    };
    this.calendarWidth = 245;
  }

  componentWillReceiveProps(nextProps) {
    const {value, format, startDate, endDate} = nextProps;
    if (value !== this.props.value) {
      this.setState({...datetime.validDate(value, format)});
    }
    if (startDate !== this.props.startDate) {
      this.setState({startDate});
    }
    if (endDate !== this.props.endDate) {
      this.setState({endDate});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  setFocusWrap = () => {
    this.focusWrap = true;
  };

  handleMouseDown = (e) => {
    e.stopPropagation();
    this.focusWrap = false;
    this.setState({isFocus: true});
  };

  handleBlur = () => {
    this.setState({isFocus: false}, () => {
      if (!this.focusWrap) {
        this.hideCalendar();
      }
    });
  };

  handleClick = () => {
    const {isOpen} = this.state;
    if (!isOpen) {
      this.setState({isOpen: true});
    }
  };

  onClear = (e) => {
    e.stopPropagation();
    const {format} = this.props;
    this.setState({...datetime.validDate('', format)});
  }

  getDate = (year, month, day, time) => {
    const {format} = this.props;
    const dt = new Date(time);
    const value = datetime.format(dt, format);
    this.setState({
      year,
      month,
      day,
      time,
      value,
      isValid: true
    }, () => {
      this.hideCalendar();
      const {onChange} = this.props;
      onChange && onChange(datetime.format(dt, datetime.DEFAULT_OUTPUT_FORMAT));
    });
  };

  getDateRange = ({startDate, endDate}) => {
    this.hideCalendar();
    const {onChange} = this.props;
    onChange && onChange({startDate, endDate});
  }

  hideCalendar = () => {
    const {isFocus} = this.state;
    if (!isFocus) {
      this.setState({isOpen: false});
    }
  };

  setSelectedDates = () => {
    const {type} = this.props;
    const {isValid, time, startDate, endDate} = this.state;
    const selectedDates = [];
    if (type === datetime.SINGLE) {
      if (isValid) selectedDates.push(time);
    } else if (type === datetime.RANGE) {
      if (typeof startDate === 'number') selectedDates.push(startDate);
      if (typeof endDate === 'number') selectedDates.push(endDate);
    }
    return selectedDates;
  };

  renderCalendar = () => {
    const {type} = this.props;
    const {isOpen, year, month, day} = this.state;
    if (isOpen) {
      const {left} = this.container.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const overflowX = (left + this.calendarWidth) >= winWidth;
      const selectedDates = this.setSelectedDates();
      const props = {
        overflowX,
        right: 0,
        left: 0,
        setFocusWrap: this.setFocusWrap,
        onClose: this.hideCalendar,
        getDate: this.getDate,
        getDateRange: this.getDateRange,
        year,
        month,
        day,
        selectedDates,
        type
      };
      return <Calendar {...props} />;
    }
    return null;
  };

  render() {
    const {placeholder, showIcon, width} = this.props;
    const {isFocus, isValid, value} = this.state;

    const boxProps = {
      ref: (ref) => (this.container = ref),
      className: styles.datepickerContainer,
      tabIndex: -1,
      onMouseDown: this.handleMouseDown,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      style: {width}
    };
    if (isFocus) boxProps.className += ' ' + styles.focus;
    if (isValid) boxProps.className += ' ' + styles.hover;

    const inputProps = {
      type: 'text',
      disabled: true,
      className: styles.datepickerInput,
      placeholder,
      value: isValid ? value : ''
    };
    if (showIcon) inputProps.style = {paddingRight: 27};

    return (
      <div {...boxProps}>
        <input {...inputProps} />
        {
          showIcon ? <svg className={`${styles.icon} ${styles.datepickerIcon}`}>
            <path d='M12 0h2v2.7h-2zM3 0h2v2.7H3z' />
            <path d='M0 2v17h17V2H0zm15 15H2V7h13v10z' />
            <path d='M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z' />
          </svg> : null
        }
        {showIcon ? <a className={`${styles.icon} ${styles.clearIcon}`} onClick={this.onClear}>&times;</a> : null}
        {this.renderCalendar()}
      </div>
    );
  }
}

export default Datepicker;
