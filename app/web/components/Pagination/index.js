import React from 'react';
import Select from '../Select';
import Input from '../Input';
import styles from './index.scss';

class Pagination extends React.Component {
  static defaultProps = {
    style: {},
    pageSizeSelectData: [
      {value: 5},
      {value: 10},
      {value: 15},
      {value: 20},
      {value: 30},
      {value: 50}
    ]
  };

  // 页面切换
  handlePageSizeChange = (value) => {
    const {onPageSizeSwitch} = this.props;

    onPageSizeSwitch && onPageSizeSwitch(value);
  };

  // 页码切换
  handleChangePageNumber = (value) => {
    const {onPageNumberSwitch, totalSize, pageSize} = this.props;
    const totalPage = Math.ceil(totalSize / pageSize);
    const cvtValue = parseInt(value, 10);
    let pageNumber = isNaN(cvtValue) ? 1 : cvtValue;
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPage) pageNumber = totalPage;
    if (pageNumber !== this.props.pageNumber) {
      onPageNumberSwitch && onPageNumberSwitch(pageNumber);
    }
    this.refs.input.resetValue(pageNumber);
  };

  // 生成校验模型
  genPattern = (totalPage) => {
    return (v) => {
      let isValid = /^[1-9]\d*$/g.test(v);
      if (isValid) isValid = totalPage >= parseInt(v, 10);
      return isValid;
    };
  };

  // 页面渲染
  render() {
    const {
      type,
      style,
      pageSizeSelectData,
      pageNumber,
      pageSize,
      totalSize
    } = this.props;

    const isSimple = type === 'simple';
    const totalPage = Math.ceil(totalSize / pageSize);
    const disabledPreClass = (pageNumber <= 1 || pageNumber > totalPage) ? styles.disabled : '';
    const disabledNextClass = pageNumber >= totalPage ? styles.disabled : '';

    return (
      <div className={styles.paginationBox} style={style}>
        {isSimple && <div className={styles.sizeSwitch}>
          <Select
            type='small'
            data={pageSizeSelectData}
            value={pageSize}
            showLines={pageSizeSelectData.length}
            onChangeValue={this.handlePageSizeChange} />
          <span>条每页 | 共{` ${totalSize} `}条</span>
        </div>}
        <div className={styles.pageSwitch}>
          <span>共{` ${totalPage} `}页</span>
          <a
            className={`${styles.link} ${disabledPreClass}`}
            onClick={this.handleChangePageNumber.bind(this, pageNumber - 1)}>&lt;</a>
          <Input
            ref='input'
            style={{width: 24, marginLeft: 20}}
            inputStyle={{height: 24, padding: 0, textAlign: 'center'}}
            value={pageNumber}
            pattern={this.genPattern(totalPage)}
            onBlur={this.handleChangePageNumber} />
          <a
            className={`${styles.link} ${disabledNextClass}`}
            onClick={this.handleChangePageNumber.bind(this, pageNumber + 1)}>&gt;</a>
        </div>
      </div>
    );
  }
}

export default Pagination;
