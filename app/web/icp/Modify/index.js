import BaseContainer from '../BaseContainer';

class Modify extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '变更备案';
    this.selectAll = [10040, 10060];
    this.selectOptions = this.genOptions();
    this.state.filingType = [4];
  }
}

export default Modify;
