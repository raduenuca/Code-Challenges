var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

// Generates a range of numbers from 1 to n
var generateRange = function (limit, start) {
    start = start || 0;
    var sequence = Array.apply(null, {length: limit + 1}).map(Number.call, Number);

    return sequence.slice(start);
};

var getDivisors = function(number) {
    var range = generateRange(parseInt(Math.sqrt(number) + 1), 1);

    var smallDivisiors = range.map(function(value) {
        if (number % value === 0) {
            return value;
        }
    }).filter(Boolean);

    var divisiors = smallDivisiors;

    smallDivisiors.forEach(function(divisor) {
        if (typeof divisiors[number / divisor] === "undefined") {
            divisiors.push(number / divisor);
        }
    });

    return divisiors.sort(asscending);
};

var asscending = function(a, b) {
    return a - b;
};

var chunkArray = function(array, chunkSize) {
    var i, j, chunks = [];
    for (i = 0, j = array.length; i < j; i = i + chunkSize) {
        chunks.push(array.slice(i, i + chunkSize).join(""));
    }

    return chunks;
};

var allAreEqual = function(array) {
    if (!array.length) return true;

    return array.reduce(function(a, b) {
        return (a === b) ? a : ("false" + b);
    }) === array[0];
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim();
        var divisors = getDivisors(input.length);

        var letters = input.split("");
        var allRepetitions = divisors
            .map(function(divisor) {
                return chunkArray(letters, divisor);
            })
            .filter(allAreEqual)
            .map(function(repetition) {
                return repetition[0].length;
            })
            .sort(asscending);

        console.log(allRepetitions[0]);
    }
});