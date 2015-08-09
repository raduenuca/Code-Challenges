var isPalindrome = function (str) {
    str = str.toString();
    return str.split("").reverse().join("") === str;
};

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
    var numbers = generateRange(1000, 2),
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

console.log(sieveOfEratosthenes(1000).reverse().filter(isPalindrome).shift());
