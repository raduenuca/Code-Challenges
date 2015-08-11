var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

var square = function(number) {
    return number * number;
};

var squareDigits = function(number) {
    var digits = number.toString().split("")
        .map(parseIntEx);

    return digits.map(square);
};

var sum = function(a, b) {
    return a + b;
};

var isHappyNumber = function(number) {
    var sumSquare = squareDigits(number).reduce(sum);
    var counter = 0;
    var maxIterations = 100;
    
    while(sumSquare !== 1 && counter < maxIterations){
        sumSquare = squareDigits(sumSquare).reduce(sum);
        counter = counter + 1;
    }
    
    return sumSquare === 1 ? sumSquare : 0;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var number = parseInt(line.trim());

        console.log(isHappyNumber(number));
    }
});