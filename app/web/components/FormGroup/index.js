import styles from './index.scss';
import React from 'react';

class FormGroup extends React.Component {
  render() {
    const {label, component, ...other} = this.props;
    return (
      <div className={styles.formGroup}>
        {label ? <label>{label}</label> : null}
        {React.createElement(component, other)}
      </div>
    );
  }
}

export default FormGroup;
