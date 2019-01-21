module.exports = {
  rangeSeq: function (start, step) {
    /// return undefined to generator to throw error if no start or step
    if (!start || !step) return () => undefined;
    let n = BigInt(String(start));
    let i = 0;
    return function () {
      if (i++ === 0) {
        return BigInt(start);
      }
      let o = BigInt(String(n)) + BigInt(String(step));
      n = o;
      return o;
    }
  }
};
