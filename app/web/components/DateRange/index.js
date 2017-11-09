import styles from './index.scss';
import React from 'react';
import Datepicker from '../Datepicker';

class DateRange extends React.Component {
  static defaultProps = {
    width: 300,
    gap: 5,
    format: 'yyyy/MM/dd',
    paddingRight: 27
  };

  constructor(props) {
    super(props);
    this.model = {};
  }

  handleChange = (key) => {
    return (dt) => {
      this.model[key] = dt;
      console.log(this.model);
    };
  };

  render() {
    const {width, gap, format, paddingRight} = this.props;
    const dtWidth = parseFloat(((width - gap - paddingRight) / 2).toFixed(2));
    const style = {width, paddingRight};
    const props = {
      format,
      width: dtWidth
    };
    return (
      <div className={styles.dateRange} style={style}>
        <Datepicker
          {...props}
          hasIcon={false}
          onChange={this.handleChange('startTime')}
        />
        <Datepicker
          {...props}
          onChange={this.handleChange('endTime')}
        />
      </div>
    );
  }
}

export default DateRange;
