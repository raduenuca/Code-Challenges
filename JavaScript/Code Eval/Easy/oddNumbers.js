// Generates a range of numbers from 1 to n
var generateRange = function (limit, start) {
    start = start || 0;
    var sequence = Array.apply(null, {length: limit + 1}).map(Number.call, Number);

    return sequence.slice(start);
};

var isOdd = function (number) {
    return number % 2 !== 0;
};

var printNumber = function (number) {
    console.log(number.toString());
};

generateRange(99, 1).filter(isOdd).forEach(printNumber);
