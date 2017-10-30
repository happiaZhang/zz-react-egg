import styles from './index.scss';
import React from 'react';
import Checkbox from '../../components/Checkbox';
import ButtonDropdown from '../../components/ButtonDropdown';

class Table extends React.Component {
  // 总选择项操作
  HandleAllCheckboxClick(state) {
    let {onAllCheckboxClick} = this.props;

    onAllCheckboxClick && onAllCheckboxClick(state);
  }

  // 选项单项操作
  HandleItemCheckboxClick(state, index, item) {
    let {onItemCheckboxClick} = this.props;

    onItemCheckboxClick && onItemCheckboxClick(state, index, item);
  }

  // 时间排序操作
  handleTimeSortClick(value) {
    let {onTimeSortClick} = this.props;

    onTimeSortClick && onTimeSortClick(value);
  }

  // 列表项操作按钮
  handleItemClick(type, item) {
    let {onItemOperationClick} = this.props;

    onItemOperationClick && onItemOperationClick(type, item);
  }

  // 表格头部渲染
  renderThead(thead, data) {
    let {timeSort} = this.props;

    return thead.map((item, index) => {
      // 判断是否有checkbox
      if (item.value === 'CHECKBOX_COLUMN') {
        let isChecked = true;
        if (data.length === 0) {
          isChecked = false;
        } else {
          for (let item of data) {
            if (!item.tbchecked) {
              isChecked = false;
              break;
            }
          }
        }

        return (
          <th key={`thead_${index}`} width={item.width}>
            <Checkbox
              checked={isChecked}
              onClick={(state) => {
                this.HandleAllCheckboxClick(state);
              }} />
          </th>
        );
      }

      // 判断是否有排序
      if (item.sort) {
        // 判断排序方式
        let timeSortClass = timeSort === 'TIME_REVERSE' ? styles.timeReverse : '';

        return (
          <th key={`thead_${index}`} width={item.width}>
            <span
              className={`${styles.timeSort} ${timeSortClass}`}
              onClick={() => {
                this.handleTimeSortClick(timeSort);
              }}>{item.text}</span>
          </th>
        );
      }

      // 判断是否有列表项操作
      let centerClass = item.value === 'OPERATION_COLUMN' ? styles.center : '';

      return (
        <th key={`thead_${index}`} className={centerClass} width={item.width}>{item.text}</th>
      );
    });
  }

  // 表格内容渲染
  renderTbody(thead, data) {
    const {pageSize, pageNumber, totalSize} = this.props;

    // 利用pageSize来判断有无表格的翻页
    if (typeof pageSize !== 'undefined') {
      let totalPage = Math.ceil(totalSize / pageSize);

      if (totalPage === 0) {
        return (
          <tr>
            <td className={styles.center} colSpan={thead.length}>{`暂无记录`}</td>
          </tr>
        );
      } else if (totalPage === 1) {
        if (!pageNumber || isNaN(pageNumber) || pageNumber !== totalPage) {
          return (
            <tr>
              <td className={styles.center} colSpan={thead.length}>{`请输入正确的页码范围，当前只有 ${totalPage} 页`}</td>
            </tr>
          );
        }
      } else {
        if (!pageNumber || isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPage) {
          return (
            <tr>
              <td className={styles.center} colSpan={thead.length}>{`请输入正确的页码范围：1~${totalPage}`}</td>
            </tr>
          );
        }
      }
    }

    return data.map((item, index) => {
      const html = thead.map((theadItem, tdIndex) => {
        const {value, render} = theadItem;
        if (value === 'CHECKBOX_COLUMN') {
          return (
            <td key={`td_${tdIndex}`}>
              <Checkbox
                checked={item.tbchecked}
                onClick={(state) => {
                  this.HandleItemCheckboxClick(state, index, item);
                }} />
            </td>
          );
        }

        if (value === 'OPERATION_COLUMN') {
          return (
            <td key={`td_${tdIndex}`} className={styles.center}>
              <ButtonDropdown
                buttons={item.operations}
                onItemClick={(type) => {
                  this.handleItemClick(type, item);
                }} />
            </td>
          );
        }

        return (
          <td key={`td_${tdIndex}`}>{render ? render(value, item) : (item[value] || '')}</td>
        );
      });

      return (
        <tr key={`tr_${index}`}>
          {html}
        </tr>
      );
    });
  }

  // 页面渲染
  render() {
    const {style = {}, theadData = [], tbodyData = []} = this.props;

    return (
      <table className={styles.tableBox} style={style}>
        <thead className={styles.thead}>
          <tr>{this.renderThead(theadData, tbodyData)}</tr>
        </thead>
        <tbody className={styles.tbody}>
          {this.renderTbody(theadData, tbodyData)}
        </tbody>
      </table>
    );
  }
}

export default Table;
