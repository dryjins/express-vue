module.exports = {
  isEven: function (n) {
    return (n) => {
      if (n === undefined) return undefined;
      return {status: BigInt(n + '') % 2n === 0n, number: BigInt(n + '')}
    };
  }
};
