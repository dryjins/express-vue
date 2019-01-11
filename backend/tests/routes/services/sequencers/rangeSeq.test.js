const expect = require('chai').expect;

const {rangeSeq} = require('../../../../routes/services/sequencers/rangeSeq');

describe('Range Sequencer', function () {
  describe('rangeSeq( 0, 9007199254740991) function', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th value is not 0', function () {
      let seq = rangeSeq(0, 9007199254740991);
      expect(seq()).to.equal(BigInt(0));
    });
    it('Should error out if 1st value is not 9007199254740991', function () {
      let seq = rangeSeq(0, 9007199254740991);
      [...Array(1)].map(seq);
      expect(seq()).to.equal(BigInt('9007199254740991'));
    });
    it('Should error out if 100th value is not 891712726219358109', function () {
      let seq = rangeSeq(0, 9007199254740991);
      [...Array(99)].map(seq);
      expect(seq()).to.equal(BigInt('891712726219358109'));
    });
    it('Should error out if 101th value is not 900719925474099100', function () {
      let seq = rangeSeq(0, 9007199254740991);
      [...Array(100)].map(seq);
      expect(seq()).to.equal(BigInt('900719925474099100'));
    });
  })
});
