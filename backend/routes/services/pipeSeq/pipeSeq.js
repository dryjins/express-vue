module.exports = {
  pipeSeq: function (sequencer, ...args) {
    let pipeObj = sequencer(...args);
    let pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
    return {
      pipeline: function (fn) {
        pipeObj = pipe(pipeObj, fn())
        return this;
      },
      invoke: function () {
        return pipeObj;
      }
    }
  }
};
