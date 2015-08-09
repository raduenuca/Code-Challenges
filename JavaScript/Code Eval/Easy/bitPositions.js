var fs = require("fs");

var getBits = function (number) {
    var binaryRepresentation = (number >>> 0).toString(2),
        numberOfBits = binaryRepresentation.length;

    //we don't get the leading zeros so we need to pad
    var leadingZeros = (numberOfBits % 4 === 0)
        ? 0
        : (numberOfBits + ( 4 - numberOfBits % 4)) - numberOfBits;

    leadingZeros = Array(leadingZeros + 1).join("0");
    binaryRepresentation = leadingZeros + binaryRepresentation;

    return binaryRepresentation.split("").map(function (bit) {
        return parseInt(bit);
    });
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var trimWord = function (word) {
            return word.toString().trim();
        };

        var input = line.split(",").map(trimWord).map(function (arg) {
            return parseInt(arg);
        });

        var n = input[0];
        var p1 = input[1];
        var p2 = input[2];

        var bitsOfN = getBits(n);
        console.log(bitsOfN[bitsOfN.length - p1] === bitsOfN[bitsOfN.length - p2]);
    }
});