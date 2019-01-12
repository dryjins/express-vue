module.exports = {
  rangeSeq: function (start, step) {
    /// return undefined to generator to throw error if no start or step
    if (!start || !step) return ()=>undefined;
    let n = BigInt(start + '');
    let i = 0;
    return function () {
      if (i++ === 0) {
        return BigInt(start);
      }
      let o = BigInt(n) + BigInt(step);
      n = o;
      return o;
    }
  }
};
