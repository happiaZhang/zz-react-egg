import React from 'react';
import Select from '../Select';
import CITY from './city.json';
import styles from './index.scss';

export default class SelectCity extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      provinceData: this.provinceDataInit(),
      provinceValue: props.provinceValue || '请选择省份',
      cityData: props.cityData || [],
      cityValue: props.cityValue || '请选择城市',
      provinceValid: props.provinceValid || false,
      cityValid: props.cityValid || false
    };
  }

  // 组件渲染完成之后
  componentDidMount() {
    if (this.state.provinceValue !== '请选择省份') {
      this.provinceToCitylist(this.state.provinceValue);
    }
  }

  // 接收新数据
  componentWillReceiveProps(nextProps) {
    this.setState({
      provinceValue: nextProps.provinceValue || '请选择省份',
      provinceValid: nextProps.provinceValid,
      cityValue: nextProps.cityValue || '请选择城市',
      cityValid: nextProps.cityValid
    });
  }

  // 数据初始化
  provinceDataInit = () => (CITY.citylist.map(item => (item.p)));

  // 省份改变
  provinceChangeHandle = province => {
    this.provinceToCitylist(province);
    let {callback} = this.props;
    callback && callback(province, true, '请选择城市', this.state.cityValid);
  };

  // 城市改变
  cityChangeHandle = (city) => {
    let {callback} = this.props;
    callback && callback(this.state.provinceValue, true, city, true);
  };

  // 省份
  provinceToCitylist(provice) {
    const cityData = [];
    const citylistData = CITY.citylist.find(({p}) => p === provice).c;
    citylistData.forEach(item => {
      cityData.push(item.n);
    });

    this.setState({cityData});
  }

  // 页面渲染
  render() {
    let {provinceData, provinceValue, cityData, cityValue, provinceValid, cityValid} = this.state;
    let provinceFromTipsShowClass = provinceValid ? '' : styles.show;
    let cityFromTipsShowClass = cityValid ? '' : styles.show;

    return (
      <div className={styles.formLine}>
        <div className={styles.formBox}>
          <div className={styles.label}>省</div>
          <div>
            <Select
              datalist={provinceData}
              value={provinceValue}
              warning={!provinceValid}
              callback={this.provinceChangeHandle}
            />
          </div>
          <div className={`${styles.formTips} ${provinceFromTipsShowClass}`}>
            <span><i>*</i> 请选择省份</span>
          </div>
        </div>
        <div className={styles.formBox}>
          <div className={styles.label}>市</div>
          <div>
            <Select
              datalist={cityData}
              value={cityValue}
              warning={!cityValid}
              callback={this.cityChangeHandle}
            />
          </div>
          <div className={`${styles.formTips} ${cityFromTipsShowClass}`}>
            <span><i>*</i> 请选择城市</span>
          </div>
        </div>
      </div>
    );
  }
}
