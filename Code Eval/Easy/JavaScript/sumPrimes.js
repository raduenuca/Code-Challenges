// Generates a range of numbers from 1 to n
var generateRange = function (limit, start) {
    start = start || 0;
    var sequence = Array.apply(null, {length: limit + 1}).map(Number.call, Number);

    var count = 0;
    while (count <= start - 1) {
        count = count + 1;
        sequence.shift();
    }

    return sequence;
};

var sieveOfEratosthenes = function (limit) {
    var numbers = generateRange(limit, 2),
        counter = 0,
        sieveCounter;

    for (counter; counter < limit; counter = counter + 1) {
        if (numbers[counter] !== -1) {
            for (sieveCounter = 2 * numbers[counter] - 2; sieveCounter < limit; sieveCounter = sieveCounter + numbers[counter]) {
                numbers[sieveCounter] = -1;
            }
        }
    }

    return numbers.filter(function (number) {
        return number !== -1;
    });
};

var sum = function (a, b) {
    return a + b;
};

console.log(sieveOfEratosthenes(10000).slice(undefined, 1000).reduce(sum));