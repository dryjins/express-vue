module.exports = {
  partialSumSeq: function (...seq) {
    let sum = 0n;
    return function () {
      seq = seq.map(n => BigInt(n + ''))
      const n = seq.shift();
      return n !== undefined ? sum += n : n;
    }
  }
};
