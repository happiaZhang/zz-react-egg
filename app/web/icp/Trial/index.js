import BaseContainer from '../BaseContainer';

class Trial extends BaseContainer {
  // 构造方法
  constructor(props) {
    super(props);
    this.title = '备案初审';
    this.selectAll = [10040, 10060];
    this.selectOptions = this.genOptions();
    this.state.filingType = [1, 2, 3];
  }
}

export default Trial;
