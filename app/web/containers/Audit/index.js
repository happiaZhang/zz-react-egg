import BaseContainer from '../BaseContainer';

class Audit extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '管局审核';
    this.selectAll = [10090, 10100];
    this.selectOptions = this.genOptions();
    this.state.filingType = [1, 2, 3, 4];
  }
}

export default Audit;
