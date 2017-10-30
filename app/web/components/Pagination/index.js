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
    let {onPageSizeSwitch} = this.props;

    onPageSizeSwitch && onPageSizeSwitch(value);
  };

  // 页码切换
  handleChangePageNumber = (value) => {
    let {onPageNumberSwitch} = this.props;

    onPageNumberSwitch && onPageNumberSwitch(value);
  };

  // 页面渲染
  render() {
    let {
      type,
      style,
      pageSizeSelectData,
      pageSize,
      totalSize,
      pageNumber
    } = this.props;

    let typeShowState = type === 'simple';
    let totalPage = Math.ceil(totalSize / pageSize);
    let disabledPreClass = (!pageNumber || isNaN(pageNumber) || pageNumber <= 1 || pageNumber > totalPage)
      ? styles.disabled
      : '';
    let disabledNextClass = (!pageNumber || isNaN(pageNumber) || pageNumber < 1 || pageNumber >= totalPage)
      ? styles.disabled
      : '';

    return (
      <div className={styles.paginationBox} style={style}>
        {typeShowState && <div className={styles.sizeSwitch}>
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
            style={{width: 24, height: 24, marginLeft: 20, padding: 0, textAlign: 'center'}}
            value={pageNumber}
            onChange={(v) => { this.handleChangePageNumber(v); }} />
          <a
            className={`${styles.link} ${disabledNextClass}`}
            onClick={this.handleChangePageNumber.bind(this, pageNumber + 1)}>&gt;</a>
        </div>
      </div>
    );
  }
}

export default Pagination;
