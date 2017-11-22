import BaseContainer from '../BaseContainer';

class Verify extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '审核幕布照片';
    this.selectAll = [10070];
    this.selectOptions = this.genOptions();
    this.state.filingType = [1, 2, 3, 4];
  }
}

export default Verify;
