const XLSX = require('xlsx');

class Workbook {
  constructor() {
    this.SheetNames = [];
    this.Sheets = {};
    this.sheetName = '备案列表';
    this.options = {bookType: 'xlsx', bookSST: true, type: 'binary'};
    this.filingType = {
      1: '首次备案',
      2: '新增网站',
      3: '新增接入',
      4: '备案变更',
      5: '注销主体',
      6: '注销网站',
      7: '取消接入'
    };
    this.filingStatus = {
      10000: '开始备案',
      10010: '填写主体信息',
      10020: '填写网站信息',
      10030: '提交备案资料',
      10040: '待初审',
      10050: '办理拍照',
      10055: '待邮寄',
      10057: '已邮寄',
      10060: '初审驳回',
      10070: '待审核幕布',
      10080: '幕布驳回',
      10090: '待管局审核',
      10100: '备案完成',
      10110: '备案失败',
      10120: '撤销备案',
      20000: '未提交',
      20001: '待处理',
      20002: '待管局审核',
      20003: '审核通过',
      20004: '审核失败',
      30000: '未提交',
      30001: '待处理',
      30002: '待管局审核',
      30003: '审核通过',
      30004: '审核失败',
      40000: '未提交',
      40001: '待处理',
      40002: '待管局审核',
      40003: '审核通过',
      40004: '审核失败'
    };
    this.sheetHeader = [
      {text: '主办单位', value: 'hostname'},
      {text: '关联域名', value: 'website'},
      {
        text: '备案类型',
        value: 'filingType',
        render: (value, item) => {
          return this.filingType[item[value]] || null;
        }
      },
      {text: '最近更新时间', value: 'updateTime'},
      {
        text: '状态',
        value: 'status',
        render: (value, item) => {
          return this.filingStatus[item[value]] || null;
        }
      }
    ];
    this.sheetData = [];
  }

  parse(data) {
    this.sheetData.push(this.getContent());
    data.forEach(d => {
      this.sheetData.push(this.getContent(d));
    });

    return this;
  }

  getContent(item) {
    const result = [];
    this.sheetHeader.forEach(({text, value, render}) => {
      if (item) {
        result.push(render ? render(value, item) : item[value] || null);
      } else {
        result.push(text);
      }
    });
    return result;
  }

  write() {
    const {SheetNames, Sheets, sheetName, sheetData, options} = this;
    SheetNames.push(sheetName);
    Sheets[sheetName] = XLSX.utils.aoa_to_sheet(sheetData);
    return XLSX.write({SheetNames, Sheets}, options);
  }
}

module.exports = Workbook;
