import styles from './index.scss';
import React from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';
import validate from '../../utils/validate';

/*
const mockData = [
  {value: '邮政EMS'},
  {value: '顺丰速递'},
  {value: '韵达公司'},
  {value: '申通公司'},
  {value: '中通公司'},
  {value: '圆通公司'},
  {value: '天天快递'}
];
*/

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  onInputChange = (v) => {
    const dataSource = this.setDataSource(v);
    this.setState({dataSource});
  };

  setDataSource = (v) => {

  };

  render() {
    const {title} = this.props;
    const {dataSource} = this.state;
    return (
      <div className={styles.autocompleteContainer}>
        {validate.isNil(title) ? null : <label>{title}</label>}
        <Input onChange={this.onInputChange} />
        {dataSource.length === 0 ? null : <Dropdown />}
      </div>
    );
  }
}

export default Autocomplete;
