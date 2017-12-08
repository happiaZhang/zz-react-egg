import styles from './index.scss';
import React from 'react';
import {scrollToTarget} from '../../utils/scroller';

class FormGroup extends React.Component {
  static defaultProps = {
    required: false,
    warningScroll: false,
    formStyle: {}
  };

  componentDidUpdate() {
    const {warningScroll, warning} = this.props;
    if (warningScroll && warning) scrollToTarget(this.formGroup);
  }

  render() {
    const {label, component, required, formStyle, ...other} = this.props;
    if (required) other.pattern = (v) => (/\S/g.test(v));
    return (
      <div ref={ref => (this.formGroup = ref)} className={styles.formGroup} style={formStyle}>
        {label ? <label>{required ? <i>*</i> : null}{label}</label> : null}
        {React.createElement(component, other)}
      </div>
    );
  }
}

export default FormGroup;
