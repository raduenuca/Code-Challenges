var fs = require("fs");

var generateZeroFilledArray = function(size) {
    return Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
};

var descending = function(a, b) {
    return b - a;
};

var computeBeauty = function(beauty, element) {
    beauty.total = beauty.total + beauty.letter * element;
    beauty.letter = beauty.letter - 1;

    return beauty;
};

var countOccurences = function(occurences, element) {
    var elementIndex = element.charCodeAt(0) - 97;
    occurences[elementIndex] += 1;

    return occurences;
};


fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        console.log(
            line.toLowerCase().replace(/[^a-z]/gi, '').split("").sort()
            .reduce(countOccurences, generateZeroFilledArray(26))
            .filter(Boolean)
            .sort(descending)
            .reduce(computeBeauty, {
                total: 0,
                letter: 26
            })
            .total
        );
    }
});