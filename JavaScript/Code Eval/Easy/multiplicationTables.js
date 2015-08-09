var padString = function (padTo, padChar) {
    return function (str) {
        str = str.toString();
        if (str.length >= padTo) {
            return str;
        }

        var leadingChars = Array(padTo - str.length + 1).join(padChar);
        return leadingChars + str;
    };
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

var multiply = function (a) {
    return function (b) {
        return a * b;
    }
};

var printMultiplicationTable = function (upTo) {
    var paddingLength = (upTo * upTo).toString().length + 1;
    var padChars = padString(paddingLength, " ");

    var tableRange = generateRange(upTo, 1);

    for (var i = 1; i <= upTo; i = i + 1) {
        console.log(tableRange.map(multiply(i)).map(padChars).join(""));
    }
};

printMultiplicationTable(12);