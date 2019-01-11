module.exports = {
  primeSeq: function () {
    let s = 2n;

    const isPrime = function (p) {
      // It is  possible to reduce time complexity here if we implement root square for BigInt.
      for (let i = 2n; i * i <= p; i++) {
        if (p % i === 0n) return false;
      }
      return true;
    };
    return function () {
      switch (s) {
        case 2n: {
          return s++;
        }
        case 3n: {
          s += 2n; // excludes even numbers after 3
          return 3n;
        }
        default: {
          while (true) {
            let o = s;
            s += 2n;
            if (isPrime(o)) {
              return o;
            }
          }
        }
      }
    }
  }
};
