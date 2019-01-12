module.exports = {
  partialSumSeq: function (...seq) {
    // partialSumSeq takes rest arguments, seq (:list) then return accumulated result. If the sequence ends return undefined.
    let sum = 0n;
    return function () {
      if (seq.length === 0) return undefined;
      seq = seq.map(n => BigInt(n + ''))
      const n = seq.shift();
      return n !== undefined ? sum += n : n;
    }
  }
};
