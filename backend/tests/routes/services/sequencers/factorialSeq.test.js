const expect = require('chai').expect;

const {factorialSeq} = require('../../../../routes/services/sequencers/factorialSeq');

describe('Factorial Sequencer', function () {
  describe('factorialSeq() function', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0! is not 1', function () {
      let seq = factorialSeq();
      expect(seq()).to.equal(1n);
    });
    it('Should error out if 1! is not 1', function () {
      let seq = factorialSeq();
      seq();
      expect(seq()).to.equal(1n);
    });
    it('Should error out if 100! is not 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000', function () {
      let seq = factorialSeq();
      [...Array(100)].forEach(seq);
      expect(seq()).to.equal(93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000n);
    });
    it('Should error out if 101! is not 9425947759838359420851623124482936749562312794702543768327889353416977599316221476503087861591808346911623490003549599583369706302603264000000000000000000000000n', function () {
      let seq = factorialSeq();
      [...Array(101)].forEach(seq);
      expect(seq()).to.equal(9425947759838359420851623124482936749562312794702543768327889353416977599316221476503087861591808346911623490003549599583369706302603264000000000000000000000000n);
    });
  })
});
