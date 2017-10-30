import React from 'react';
import Radio from '../Radio';

class RadioGroup extends React.Component {
  // 构造方法
  constructor(props) {
    super(props);

    this.state = {
      checkedValue: props.defalutValue || ''
    };
  }

  // 接收新数据
  componentWillReceiveProps(nextProps) {
    this.setState({
      checkedValue: nextProps.defalutValue
    });
  }

  // 渲染radio
  radioListRender() {
    let {data, callback} = this.props;
    let {checkedValue} = this.state;

    return data.map((item, index) => {
      let checkState = checkedValue === item.value;
      return <Radio
        key={index}
        text={item.text}
        value={item.value}
        checked={checkState}
        callback={(value) => {
          callback && callback(value);
        }}
      />;
    });
  }

  // 页面渲染
  render() {
    return (
      <div>
        {this.radioListRender()}
      </div>
    );
  }
}

export default RadioGroup;
