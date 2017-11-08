import styles from './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import datetime from './datetime';

let nodeContainer = null;

/**
 * @param {string} value: the value format of date must be defined as 'yyyy-mm-dd'
 * @param {string} format
 * @param {string} placeholder
 */

class Datepicker extends React.Component {
  static defaultProps = {
    format: 'YYYY-MM-DD',
    placeholder: 'YYYY/MM/DD'
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isOpen: false,
      ...this.formatValue(props.value, props.format)
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !(stateKey == null);
  }

  // 格式化日期数值
  formatValue = (value, format) => {
    let isValid = false;

    if (value) {
      const dtArray = value.split('-');
      if (dtArray.length === 3) {
        isValid = datetime.isValid({
          year: dtArray[0],
          month: dtArray[1],
          day: dtArray[2]
        });
      }
    }

    const dt = isValid ? new Date(value) : new Date();
    return {
      year: datetime.year(dt),
      month: datetime.month(dt),
      day: datetime.day(dt),
      value: datetime.format(dt, format),
      isValid
    };
  };

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
    const {isOpen, year, month, day} = this.state;
    if (!isOpen) {
      const {bottom, left} = this.container.getBoundingClientRect();
      this.showCalendar({
        bottom,
        left,
        isShow: true,
        setFocusWrap: this.setFocusWrap,
        onClose: this.hideCalendar,
        year,
        month,
        day
      });
      this.setState({isOpen: true});
    }
  };

  showCalendar = (props) => {
    if (!nodeContainer) {
      nodeContainer = document.createElement('div');
      document.body.appendChild(nodeContainer);
    }
    ReactDOM.render(<Calendar {...props} />, nodeContainer);
  };

  hideCalendar = () => {
    const {isFocus} = this.state;
    if (!isFocus) {
      ReactDOM.render(<Calendar isShow={false} />, nodeContainer);
      this.setState({isOpen: false});
    }
  };

  render() {
    const {isFocus, isValid, value} = this.state;

    const boxProps = {
      ref: (ref) => (this.container = ref),
      className: styles.datepickerContainer,
      tabIndex: -1,
      onMouseDown: this.handleMouseDown,
      onBlur: this.handleBlur,
      onClick: this.handleClick
    };
    if (isFocus) boxProps.className += ' ' + styles.focus;

    const {placeholder} = this.props;
    const inputProps = {
      type: 'text',
      disabled: true,
      className: styles.datepickerInput,
      placeholder,
      value: isValid ? value : ''
    };

    return (
      <div {...boxProps}>
        <input {...inputProps} />
        <svg className={styles.datepickerIcon}>
          <path d='M12 0h2v2.7h-2zM3 0h2v2.7H3z' />
          <path d='M0 2v17h17V2H0zm15 15H2V7h13v10z' />
          <path d='M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z' />
        </svg>
      </div>
    );
  }
}

export default Datepicker;
