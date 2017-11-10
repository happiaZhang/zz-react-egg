import styles from './calendar.scss';
import React from 'react';
import datetime from './datetime';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const {isValid, year, month, day} = props;
    this.selectedDate = {
      year: isValid ? year : null,
      month: isValid ? month : null,
      day: isValid ? day : null
    };
    this.state = {
      isShow: props.isShow,
      isFocus: false,
      year,
      month,
      day,
      direction: props.direction,
      selectedTime: props.selectedTime,
      hoverTime: props.hoverTime
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !(stateKey == null);
  }

  handleMouseDown = (e) => {
    e.stopPropagation();
    const {setFocusWrap} = this.props;
    setFocusWrap && setFocusWrap();
    this.setState({isFocus: true});
  };

  handleBlur = () => {
    this.setState({isFocus: false});
    const {onClose} = this.props;
    onClose && onClose();
  };

  onMonth = (month) => {
    let {year} = this.state;
    if (!month) {
      month = 12;
      year -= 1;
    }
    if (month > 12) {
      month = 1;
      year += 1;
    }
    this.setState({year, month});
  }

  onYear = (year) => {
    this.setState({year});
  }

  handleClick = (year, month, day) => {
    const {getDate} = this.props;
    getDate && getDate(year, month, day);
  };

  resetSelectedDate = (year, month, day) => {
    this.selectedDate.year = year;
    this.selectedDate.month = month;
    this.selectedDate.day = day;
  };

  onSelectDate = (year, month, day, time) => {
    let {selectedTime} = this.state;
    if (selectedTime == null) {
      this.resetSelectedDate(year, month, day);
      selectedTime = time;
      this.setState({
        year,
        month,
        day,
        selectedTime
      });
    } else {
      const {getDateRange} = this.props;
      const {selectedTime, hoverTime, direction} = this.state;
      getDateRange && getDateRange({
        startTime: direction === datetime.BEGIN ? hoverTime : selectedTime,
        endTime: direction === datetime.BEGIN ? selectedTime : hoverTime
      });
    }
  };

  onHoverDate = (hoverTime) => {
    const {selectedTime} = this.state;
    if (!(selectedTime == null)) {
      this.setState({
        hoverTime,
        direction: hoverTime < selectedTime ? datetime.BEGIN : datetime.END
      });
    }
  };

  renderHeader = () => {
    const {year, month} = this.state;
    return (
      <div className={styles.calendarHeader}>
        <span className={styles.calendarMonthPrev} onClick={this.onMonth.bind(this, month - 1)}>
          <svg><path d='M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z' /></svg>
        </span>
        <span className={styles.calendarMonthCurr}>
          <span>{datetime.convertMonth(month)}</span>
          <div className={styles.calendarYearWrap}>
            <input type='text' disabled value={year} />
            <span className={styles.calendarYearUp} onClick={this.onYear.bind(this, year + 1)} />
            <span className={styles.calendarYearDown} onClick={this.onYear.bind(this, year - 1)} />
          </div>
        </span>
        <span className={styles.calendarMonthNext} onClick={this.onMonth.bind(this, month + 1)}>
          <svg><path d='M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z' /></svg>
        </span>
      </div>
    );
  };

  renderTBody = () => {
    const {year: sY, month: sM, day: sD} = this.selectedDate;
    const {year: cY, month: cM, day: cD} = datetime.getCurrentDate();
    const {type} = this.props;
    const {year, month, selectedTime, hoverTime, direction} = this.state;
    const isBegin = direction === datetime.BEGIN;
    const isEnd = direction === datetime.END;
    const startDate = new Date(year, month - 1, 1);
    const wk = datetime.weekday(startDate) + 1;
    datetime.add(startDate, -1 * wk);

    const trList = [];
    for (let i = 1; i <= 6; i++) {
      const tdList = [];
      for (let j = 1; j <= 7; j++) {
        datetime.add(startDate, 1);
        const t = startDate.getTime();
        const y = datetime.year(startDate);
        const m = datetime.month(startDate);
        const d = datetime.day(startDate);
        const active = m === month;
        const now = y === cY && m === cM && d === cD;
        const selected = y === sY && m === sM && d === sD;
        let hover = false;
        if (active && isBegin) hover = t >= hoverTime && t < selectedTime;
        if (active && isEnd) hover = t > selectedTime && t <= hoverTime;

        let tdClass = '';
        if (hover) tdClass += ' ' + styles.hover;
        if (!active) tdClass += ' ' + styles.inactive;
        if (active && !hover && now) tdClass += ' ' + styles.now;
        if (selected) tdClass += ' ' + styles.selected;
        const tdProps = {
          key: t,
          className: tdClass
        };

        if (type === datetime.RANGE) {
          tdProps.onClick = this.onSelectDate.bind(this, y, m, d, t);
          tdProps.onMouseEnter = this.onHoverDate.bind(this, t);
        } else {
          tdProps.onClick = this.handleClick.bind(this, y, m, d);
        }

        tdList.push(<td {...tdProps}><span>{d}</span></td>);
      }
      trList.push(<tr key={i}>{tdList}</tr>);
    }

    return <tbody>{trList}</tbody>;
  };

  renderTHead = () => {
    const WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];
    const thList = [];
    WEEKDAY.forEach((w, i) => {
      thList.push(<th key={i}>{w}</th>);
    });
    return <thead><tr>{thList}</tr></thead>;
  };

  render() {
    const {isShow} = this.state;
    if (!isShow) return null;

    const {left, overflowX, right} = this.props;
    const {isFocus} = this.state;
    const style = {};
    overflowX ? style.right = right : style.left = left;
    const props = {
      tabIndex: -1,
      className: styles.calendarWrap,
      style,
      onMouseDown: this.handleMouseDown,
      onBlur: this.handleBlur
    };
    if (isFocus) props.className += ' ' + styles.focus;

    return (
      <div {...props}>
        {this.renderHeader()}
        <table className={styles.calendarBody}>
          {this.renderTHead()}
          {this.renderTBody()}
        </table>
      </div>
    );
  }
}

export default Calendar;
