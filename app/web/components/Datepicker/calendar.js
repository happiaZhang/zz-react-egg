import styles from './index.scss';
import React from 'react';
import datetime from './datetime';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: props.isShow,
      isFocus: false,
      year: props.year,
      month: props.month,
      day: props.day
    };
  }

  componentWillReceiveProps(nextProps) {
    const {isShow} = nextProps;
    if (isShow !== this.props.isShow) {
      this.setState({isShow});
    }
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
    const {year: sY, month: sM, day: sD} = this.props;
    const {year, month} = this.state;
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
        const selected = y === sY && m === sM && d === sD;

        let tdClass = '';
        if (!active) tdClass += ' ' + styles.inactive;
        if (selected) tdClass += ' ' + styles.selected;
        tdList.push(<td key={t} className={tdClass}>{d}</td>);
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

    const {bottom, left} = this.props;
    const {isFocus} = this.state;
    const style = {
      top: bottom,
      left
    };
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
