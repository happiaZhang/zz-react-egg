const {assert} = require('egg-mock/bootstrap');
const Workbook = require('../../app/service/workbook');

describe('test/service/workbook.test.js', () => {
  describe('parse()', () => {
    it('parameter >>> []', () => {
      const result = new Workbook();
      result.parse([]);
      assert(result.sheetData.length === 1);
      const header = result.sheetData[0];
      header.forEach((h, i) => {
        assert(h === result.sheetHeader[i].text);
      });
    });

    it('parameter >>> normal', () => {
      const result = new Workbook();
      const mockData = [{
        hostname: 'host1',
        website: 'site1',
        filingType: 1,
        updateTime: '2017-12-15 11:26:38',
        status: 10040
      }, {
        hostname: 'host2',
        website: 'site2',
        filingType: 2,
        updateTime: '2017-12-15 11:26:38',
        status: 10100
      }];
      result.parse(mockData);
      assert(result.sheetData.length === mockData.length + 1);
      result.sheetData.forEach((row, i) => {
        if (i > 0) {
          assert(row[0] === mockData[i - 1].hostname);
          assert(row[1] === mockData[i - 1].website);
          assert(row[2] === result.filingType[mockData[i - 1].filingType]);
          assert(row[3] === mockData[i - 1].updateTime);
          assert(row[4] === result.filingStatus[mockData[i - 1].status]);
        }
      });
    });
  });
});
