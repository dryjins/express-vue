module.exports = {
  isEven: function (n) {
    // isEven takes n (:BigInt) then test if it is even number.
    return (n) => {
      if (n === undefined) return undefined;
      return {status: BigInt(n + '') % 2n === 0n, number: BigInt(n + '')}
    };
  }
};
