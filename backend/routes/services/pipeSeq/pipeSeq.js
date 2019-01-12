module.exports = {
  pipeSeq: function (sequencer, ...args) {
    // pipeSeq takes sequencer (:function)  and rest arguments (:list) then return piped sequencer object.
    let pipeObj = sequencer(...args);
    let pipe = (...fns) => x => fns.reduce((v, f) => f(v), x); // fold function sequences with args
    return {
      pipeline: function (fn) {
        pipeObj = pipe(pipeObj, fn());
        return this;
      },
      invoke: function () {
        return pipeObj;
      }
    }
  }
};
