const expect = require('chai').expect;

const {partialSumSeq} = require('../../../../routes/services/sequencers/partialSumSeq');

describe('PartialSum Sequencer', function () {
  describe('partialSumSeq(1, 3, 7, 2, 0) function', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    let seq = partialSumSeq(1, 3, 7, 2, 0);
    it('Should error out if the sequence is not 1', function () {
      expect(seq()).to.equal(BigInt('1'));
    });
    it('Should error out if the sequence is not 4', function () {
      expect(seq()).to.equal(BigInt('4'));
    });
    it('Should error out if the sequence is not 11', function () {
      expect(seq()).to.equal(BigInt('11'));
    });
    it('Should error out if the sequence is not 13', function () {
      expect(seq()).to.equal(BigInt('13'));
    });
    it('Should error out if the sequence is not  13', function () {
      expect(seq()).to.equal(BigInt('13'));
    });
    it('Should error out if the sequence is not undefined', function () {
      expect(seq()).to.equal(undefined);
    });





  })
});
