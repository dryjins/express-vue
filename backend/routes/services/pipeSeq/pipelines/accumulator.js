module.exports = {
  accumulator : function (n) {
    // accumulator takes n (:BigInt) then accumulates the result.
    let sum = 0n;
    return function (n) {
      if (n === undefined) return undefined;
      sum += BigInt(n + '');
      return sum;
    };
  }
};
