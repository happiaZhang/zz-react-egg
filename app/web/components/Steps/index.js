import React from 'react';
import styles from './index.scss';

export default class Steps extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      step: props.step || 1
    };
  }

  // 接收新的数据
  componentWillReceiveProps(nextProps) {
    const {step = 1} = nextProps;
    if (step !== this.props.step) {
      this.setState({step});
    }
  }

  // 获取步骤信息
  getStep() {
    let {step} = this.state;
    let [stepOneClass, stepTwoClass, stepThreeClass, stepWidth] = ['', '', '', 0];

    switch (step) {
      case 1:
        stepOneClass = styles.selected;
        break;
      case 2:
        stepOneClass = styles.selected;
        stepTwoClass = styles.selected;
        stepWidth = '50%';
        break;
      case 3:
        stepOneClass = styles.selected;
        stepTwoClass = styles.selected;
        stepThreeClass = styles.selected;
        stepWidth = '100%';
        break;
    }

    return {
      stepOneClass,
      stepTwoClass,
      stepThreeClass,
      stepWidth
    };
  }

  // 页面渲染
  render() {
    let {style} = this.props;
    let {stepOneClass, stepTwoClass, stepThreeClass, stepWidth} = this.getStep();

    return (
      <div className={styles.container} style={style}>
        <div className={styles.line} />
        <div className={styles.overline} style={{width: stepWidth}} />
        <div className={`${styles.step} ${stepOneClass}`} style={{left: -50}}>
          <i className={styles.icon}>1</i>
          <span className={styles.text}>选择开票金额</span>
        </div>
        <div className={`${styles.step} ${stepTwoClass}`} style={{left: '50%', marginLeft: -50}}>
          <i className={styles.icon}>2</i>
          <span className={styles.text}>确认开票信息</span>
        </div>
        <div className={`${styles.step} ${stepThreeClass}`} style={{right: -50}}>
          <i className={styles.icon}>3</i>
          <span className={styles.text}>申请开票成功</span>
        </div>
      </div>
    );
  }
}
