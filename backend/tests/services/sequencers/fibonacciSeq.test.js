const expect = require('chai').expect;

const {fibonacciSeq} = require('../../../routes/services/sequencers/fibonacciSeq');

describe('Fibonacci Sequencer', function () {
  describe('fibonacciSeq() function', function () {
    BigInt.prototype.toJSON = function() { return this.toString(); };
    it('Should error out if 0th value is not 1', function () {
      let seq = fibonacciSeq();
      expect(seq()).to.equal(0n);
    });
    it('Should error out if 1st value is not 1', function () {
      let seq = fibonacciSeq();
      seq();
      expect(seq()).to.equal(1n);
    });
    it('Should error out if 100th value is not 218922995834555169026', function () {
      let seq = fibonacciSeq();
      [...Array(99)].forEach(seq);
      expect(seq()).to.equal(218922995834555169026n);
    });
    it('Should error out if 101th value is not 354224848179261915075', function () {
      let seq = fibonacciSeq();
      [...Array(100)].forEach(seq);
      expect(seq()).to.equal(354224848179261915075n);
    });
  })
});
