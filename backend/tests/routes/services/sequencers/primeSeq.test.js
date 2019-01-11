const expect = require('chai').expect;

const {primeSeq} = require('../../../../routes/services/sequencers/primeSeq');

describe('Prime Sequencer', function () {
  describe('primeSeq() function', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th value is not 2', function () {
      let seq = primeSeq();
      expect(seq()).to.equal(BigInt('2'));
    });
    it('Should error out if 1st value is not 3', function () {
      let seq = primeSeq();
      [...Array(1)].map(seq);
      expect(seq()).to.equal(BigInt('3'));
    });
    it('Should error out if 1st value is not 5', function () {
      let seq = primeSeq();
      [...Array(2)].map(seq);
      expect(seq()).to.equal(BigInt('5'));
    });
    it('Should error out if 1st value is not 7', function () {
      let seq = primeSeq();
      [...Array(3)].map(seq);
      expect(seq()).to.equal(BigInt('7'));
    });
  })
});
