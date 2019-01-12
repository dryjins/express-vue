import ApiHandler from '@/services/ApiHandler';

describe('ApiHandler', () => {
  it('should have correct methods', () => {
    expect(typeof ApiHandler.getGeneratorNext).to.equal('function');
    expect(typeof ApiHandler.postGenerator).to.equal('function');
  });

  it('should return response for postGenerator', () => {
    const param = { sequencer: 'rangeSeq', pipelines: ['isEven'], args: ['1', '2'] };
    ApiHandler.postGenerator(param)
      .then((res) => {
        expect(res.data).to.deep.equal({ message: 'rangeSeq is generated with args (1,2), pipelines (accumulator)' });
      });
  });

  it('should have proper sequences after the call', () => {
    expect(ApiHandler.data.sequence).to.deep.equal([]);
  });

  it('should return response for getGenerator', () => {
    ApiHandler.getGeneratorNext()
      .then((res) => {
        expect(res.data).to.deep.equal({ value: '1' });
        expect(ApiHandler.data.sequence).to.deep.equal([{ value: '1' }]);
      });
  });
});
