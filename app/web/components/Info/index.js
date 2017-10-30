import styles from './index.scss';
import React from 'react';
import Checkbox from '../../components/Checkbox';
import validate from '../../utils/validate';

class Info extends React.Component {
  static defaultProps = {
    labelWidth: 200,
    content: '',
    checkMode: false,
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      checkMode: props.checkMode,
      checked: props.checked
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {content, checkMode} = nextProps;
    if (content !== this.props.content) {
      this.setState({content});
    }
    if (checkMode !== this.props.checkMode) {
      this.setState({checkMode});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  handleClick = (checked) => {
    this.setState({checked});
    const {onChange} = this.props;
    onChange && onChange(checked);
  };

  render() {
    const {label, labelWidth} = this.props;
    const {content, checkMode, checked} = this.state;
    const checkboxStyle = {
      position: 'absolute',
      top: 8,
      right: 0,
      display: 'inline-block',
      lineHeight: 1
    };
    return (
      <div className={styles.infoContainer}>
        <label style={{width: labelWidth}}>{label}</label>
        <div className={styles.infoContent}>{content}</div>
        {checkMode ? <Checkbox style={checkboxStyle} checked={checked} onClick={this.handleClick} /> : ''}
      </div>
    );
  }
}

export default Info;
