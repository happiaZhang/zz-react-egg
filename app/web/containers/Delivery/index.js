import BaseContainer from '../BaseContainer';

class Delivery extends BaseContainer {
  constructor(props) {
    super(props);
    this.title = '邮寄幕布';
    this.selectAll = [10055];
    this.selectOptions = this.genOptions();
    this.state.filingType = [1, 2, 3, 4];
  }
}

export default Delivery;
