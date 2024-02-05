function sum_all(arr) {
    let sum = 0;
    let i = 0;
    while (i < arr.length) {
      sum = arr[i] + sum;
      i++;
    }
    return sum;
}

module.exports = sum_all;
