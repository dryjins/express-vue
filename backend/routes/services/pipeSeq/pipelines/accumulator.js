module.exports = {
  accumulator : function (n) {
    let sum = 0n;
    return function (n) {
      if (n === undefined) return undefined;
      sum += BigInt(n + '');
      return sum;
    };
  }
};
