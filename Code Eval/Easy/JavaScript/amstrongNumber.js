var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

var sum = function(a, b) {
    return a + b;
};

var pow = Math.pow;
var xPowN = function(n, x){
    return function(x){
        return pow(x, n);
    }
};

var isAmstrongNumber = function(number) {
    var powLength = xPowN(number.length);
    var sumPowLenghtDigits = number.split("")
        .map(parseIntEx)
        .map(powLength)
        .reduce(sum);
        
    return parseInt(number) === sumPowLenghtDigits;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var number = line.trim();

        console.log(isAmstrongNumber(number) ? "True" : "False");
    }
});