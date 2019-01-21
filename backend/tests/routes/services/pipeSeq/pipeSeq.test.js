const expect = require('chai').expect;

const {pipeSeq} = require('../../../../routes/services/pipeSeq/pipeSeq');
const sequencers = require('../../../../routes/services/sequencers');
const pipelines = require('../../../../routes/services/pipeSeq/pipelines');

describe('Pipe Sequencer', function () {
  describe('factorialSeq() function, accumulator and isEven pipelines', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th call is not 1 when {sequencer:factorialSeq}', function () {
      let seq = pipeSeq(sequencers.factorialSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      expect(seq()).to.deep.equal({status:false, number: 1n});
    });
    it('Should error out if 100th call is not {status:true, number: 94269001683709979260859834124473539872070722613982672442938359305624678223479506023400294093599136466986609124347432647622826870038220556442336528920420940314n} when {sequencer:factorialSeq, pipeline: [accumulator, isEven]}',
      function () {
      let seq = pipeSeq(sequencers.factorialSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      [...Array(100)].forEach(seq);
      expect(seq()).to.deep.equal({status:true, number: 94269001683709979260859834124473539872070722613982672442938359305624678223479506023400294093599136466986609124347432647622826870038220556442336528920420940314n});
    });
  });
  describe('fibonacciSeq() function, accumulator and isEven pipelines', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th call is not {status:true, number: 0n}', function () {
      let seq = pipeSeq(sequencers.fibonacciSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      expect(seq()).to.deep.equal({status:true, number: 0n});
    });
    it('Should error out if 100th call is not {status:true, number: 927372692193078999175n}',
      function () {
      let seq = pipeSeq(sequencers.fibonacciSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      [...Array(100)].map(seq);

      expect(seq()).to.deep.equal({status:false, number: 927372692193078999175n}); // Wolfram: Sum[Fibonacci[i], {i, 0, 100}]
    });
  })
  describe('partialSumSeq(1, 3, 7, 2, 0) function, accumulator and isEven pipelines', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th call is not 1', function () {
      let seq = pipeSeq(sequencers.partialSumSeq, 1, 3, 7, 2, 0)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      expect(seq()).to.deep.equal({status:false, number: 1n});
      expect(seq()).to.deep.equal({status:false, number: 5n}); //1 + (1 + 3)
      expect(seq()).to.deep.equal({status:true, number: 16n}); //1 + (1 + 3) + (1+ 3 + 7)
      expect(seq()).to.deep.equal({status:false, number: 29n}); //1 + (1 + 3) + (1+ 3 + 7) + (1 + 3 + 7 + 2)
      expect(seq()).to.deep.equal({status:true, number: 42n}); //1 + (1 + 3) + (1+ 3 + 7) + (1 + 3 + 7 + 2) + (1 + 3 + 7 + 2 + 0)
      expect(seq()).to.deep.equal(undefined);
    });
  })
  describe('primeSeq() function, accumulator and isEven pipelines', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th call is not 1', function () {
      let seq = pipeSeq(sequencers.factorialSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      expect(seq()).to.deep.equal({status:false, number: 1n});
    });
    it('Should error out if 100th call is not {status:true, number: 94269001683709979260859834124473539872070722613982672442938359305624678223479506023400294093599136466986609124347432647622826870038220556442336528920420940314n} when {sequencer:factorialSeq, pipeline: [accumulator, isEven]}',
      function () {
      let seq = pipeSeq(sequencers.factorialSeq)
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      [...Array(100)].forEach(seq);
      expect(seq()).to.deep.equal({status:true, number: 94269001683709979260859834124473539872070722613982672442938359305624678223479506023400294093599136466986609124347432647622826870038220556442336528920420940314n});
    });
  })
  describe('rangeSeq(0, 9007199254740991) function, accumulator and isEven pipelines', function () {
    BigInt.prototype.toJSON = function() {return this.toString(); };
    it('Should error out if 0th call is not 27021597764222973', function () {
      let seq = pipeSeq(sequencers.rangeSeq, '0', '9007199254740991')
        .pipeline(pipelines.accumulator)
        .pipeline(pipelines.isEven)
        .invoke();
      [...Array(2)].forEach(seq);
      expect(seq()).to.deep.equal({status:false, number: 27021597764222973n});
    });
  })
});
