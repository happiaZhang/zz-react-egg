import styles from './index.scss';
import React from 'react';
import Checkbox from '../../components/Checkbox';
import validate from '../../utils/validate';

class PhotoFrame extends React.Component {
  static defaultProps = {
    width: 158,
    height: 99,
    checkMode: false,
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      checkMode: props.checkMode,
      showImg: validate.isURL(props.src),
      zoomIn: false
    };
    this.reservedSpace = 80;
  }

  componentWillReceiveProps(nextProps) {
    const {checkMode, src} = nextProps;
    if (checkMode !== this.props.checkMode) {
      this.setState({checkMode});
    }
    if (src !== this.props.src) {
      const showImg = validate.isURL(src);
      this.setState({showImg});
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

  getFilename = () => {
    const {src} = this.props;
    const dirArray = src.split('/');
    return dirArray[dirArray.length - 1];
  };

  handleZoomIn = (e) => {
    e.stopPropagation();
    this.setState({zoomIn: true});
  };

  handleZoomOut = (e) => {
    e.stopPropagation();
    this.setState({zoomIn: false});
  };

  canDownload = () => {
    const {showImg, checkMode, zoomIn} = this.state;
    return showImg && !checkMode && !zoomIn;
  };

  stopBubble = (e) => {
    e.stopPropagation();
  };

  setDisplayWidth = () => {
    const maxWidth = window.innerWidth - this.reservedSpace;
    return maxWidth >= this.img.naturalWidth ? this.img.naturalWidth : maxWidth;
  };

  setContainerProps = () => {
    const {width, height} = this.props;
    const {zoomIn} = this.state;
    const style = {width, height};
    const props = {
      className: zoomIn ? styles.frameCover : styles.frameContainer
    };

    if (zoomIn) {
      props.style = {cursor: 'zoom-out'};
      props.onClick = this.handleZoomOut;
    } else {
      props.style = style;
    }

    if (this.canDownload()) {
      style.cursor = 'zoom-in';
      props.onClick = this.handleZoomIn;
    }

    return props;
  };

  setImgProps = () => {
    const {shadeText, src} = this.props;
    const {zoomIn} = this.state;

    const props = {
      ref: ref => (this.img = ref),
      src,
      alt: shadeText
    };

    if (zoomIn) {
      props.style = {
        width: this.setDisplayWidth(),
        cursor: 'default'
      };
      props.onClick = this.stopBubble;
    }

    return props;
  };

  setLinkProps = () => {
    const {src} = this.props;
    const props = {
      className: styles.frameDownload,
      href: src,
      target: '_blank',
      download: this.getFilename(),
      onClick: this.stopBubble
    };
    return props;
  };

  render() {
    const {shadeText} = this.props;
    const {checked, checkMode, showImg} = this.state;

    const checkboxStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'inline-block'
    };

    return (
      <div {...this.setContainerProps()}>
        {showImg ? <img {...this.setImgProps()} /> : <span className={styles.frameShade}>{shadeText}</span>}
        {this.canDownload() ? <a {...this.setLinkProps()}>下载</a> : null}
        {checkMode ? <Checkbox style={checkboxStyle} checked={checked} onClick={this.handleClick} /> : null}
      </div>
    );
  }
}

export default PhotoFrame;
