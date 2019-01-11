module.exports = {
  factorialSeq: function () {
    let [prev, n] = [1n, 0n];
    return function () {
      if (n === 0n) {
        return ++n;
      }
      let o = prev * (n++);
      prev = o;
      return o;
    }
  }
};
