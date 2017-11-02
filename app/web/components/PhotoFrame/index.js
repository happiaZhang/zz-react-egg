import styles from './index.scss';
import React from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import validate from '../../utils/validate';

class PhotoFrame extends React.Component {
  static defaultProps = {
    width: 158,
    height: 99
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checkMode: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {checkMode} = nextProps;
    if (checkMode !== this.props.checkMode) {
      this.setState({checkMode});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return !validate.isNil(stateKey);
  }

  handleClick =(checked) => {
    this.setState({checked});
    const {onChange} = this.props;
    onChange && onChange(checked);
  };

  render() {
    const {className, width, height, shadeText} = this.props;
    const {checked, checkMode} = this.state;
    const style = {width, height};
    const checkboxStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'inline-block'
    };
    return (
      <div className={`${styles.frameContainer} ${className}`} style={style}>
        <span className={styles.frameShade}>{shadeText}</span>
        {checkMode ? '' : <Button className={styles.frameDownload} text='下载' />}
        {checkMode ? <Checkbox style={checkboxStyle} checked={checked} onClick={this.handleClick} /> : ''}
      </div>
    );
  }
}

export default PhotoFrame;
