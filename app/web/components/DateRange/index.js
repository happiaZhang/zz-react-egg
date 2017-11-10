import styles from './index.scss';
import React from 'react';
import Datepicker from '../Datepicker';
import datetime from '../Datepicker/datetime';

class DateRange extends React.Component {
  static defaultProps = {
    width: 300,
    gap: 5,
    format: 'yyyy/MM/dd',
    paddingRight: 27
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null
    };
  }

  handleChange = ({startTime, endTime}) => {
    this.setState({startTime, endTime});
  };

  render() {
    const {width, gap, format, paddingRight} = this.props;
    const {startTime, endTime} = this.state;
    const dtWidth = parseFloat(((width - gap - paddingRight) / 2).toFixed(2));
    const style = {width, paddingRight};
    const props = {
      format,
      width: dtWidth,
      type: datetime.RANGE,
      onChange: this.handleChange
    };
    return (
      <div className={styles.dateRange} style={style}>
        <Datepicker
          {...props}
          hasIcon={false}
          value={startTime}
        />
        <Datepicker
          {...props}
          value={endTime}
        />
      </div>
    );
  }
}

export default DateRange;
