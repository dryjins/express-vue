module.exports = {
  fibonacciSeq: function () {
    let [n1, n2] = [0n, 1n];
    let i = 0;
    return function () {
      switch (i++) {
        case 0:
          return 0n;
        case 1:
          return 1n;
        default:{
          let n3 = n1 + n2;
          [n1, n2] = [n2, n3];
          return n3;
        }
      }
    }
  }
};
