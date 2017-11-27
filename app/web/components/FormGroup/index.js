import styles from './index.scss';
import React from 'react';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      startDate: props.startDate,
      endDate: props.endDate,
      data: props.data,
      btns: props.btns
    };
  }

  componentWillReceiveProps(nextProps) {
    const {value, startDate, endDate, data, btns} = nextProps;
    if (value !== this.props.value) {
      this.setState({value});
    }
    if (data !== this.props.data) {
      this.setState({data});
    }
    if (startDate !== this.props.startDate) {
      this.setState({startDate});
    }
    if (endDate !== this.props.endDate) {
      this.setState({endDate});
    }
    if (btns !== this.props.btns) {
      this.setState({btns});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  handleChange = value => {
    this.setState({value});
  };

  render() {
    const {label, component, ...other} = this.props;
    const {value, startDate, endDate, data, btns} = this.state;
    return (
      <div className={styles.formGroup}>
        {label ? <label>{label}</label> : null}
        {React.createElement(component, {
          onChange: this.handleChange,
          ...other,
          value,
          startDate,
          endDate,
          data,
          btns
        })}
      </div>
    );
  }
}

export default FormGroup;
