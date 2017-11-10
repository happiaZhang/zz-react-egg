import styles from './index.scss';
import React from 'react';
import Checkbox from '../../components/Checkbox';
import validate from '../../utils/validate';

class PhotoFrame extends React.Component {
  static defaultProps = {
    width: 158,
    height: 99,
    reservedSpace: 80,
    scalable: false
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checkMode: false,
      showImg: false,
      zoomOut: false
    };
    this.loadedImg = false;
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

  componentDidMount() {
    this.getRealWidth();
  }

  componentDidUpdate() {
    if (!this.loadedImg) {
      this.getRealWidth();
    }
  }

  getRealWidth = () => {
    if (this.canDownload()) {
      this.realWidth = this.img.naturalWidth;
      this.loadedImg = true;
    }
  };

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

  handleZoom = (e) => {
    e.stopPropagation();
    console.log(this.realWidth);
  };

  canDownload = () => {
    const {showImg, checkMode} = this.state;
    return showImg && !checkMode;
  };

  handleDownload = (e) => {
    e.stopPropagation();
  };

  render() {
    const {width, height, shadeText, src} = this.props;
    const {checked, checkMode, showImg} = this.state;
    const style = {width, height};
    const checkboxStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'inline-block'
    };
    const props = {style};
    const canDownload = this.canDownload();
    let aProps = null;
    if (canDownload) {
      style.cursor = 'pointer';
      props.onClick = this.handleZoom;
      aProps = {
        className: styles.frameDownload,
        href: src,
        target: '_blank',
        download: this.getFilename(),
        onClick: this.handleDownload
      };
    }
    return (
      <div className={`${styles.frameContainer}`} {...props}>
        {
          showImg
            ? <img ref={ref => (this.img = ref)} src={src} alt={shadeText} />
            : <span className={styles.frameShade}>{shadeText}</span>
        }
        {canDownload ? <a {...aProps}>下载</a> : ''}
        {checkMode ? <Checkbox style={checkboxStyle} checked={checked} onClick={this.handleClick} /> : ''}
      </div>
    );
  }
}

export default PhotoFrame;
