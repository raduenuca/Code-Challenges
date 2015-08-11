var fs = require("fs");

var sum = function (a, b) {
    return a + b;
};

var parseIntEx = function (str) {
    return parseInt(str);
};

console.log(fs.readFileSync(process.argv[2]).toString().split('\n')
    .filter(Boolean)
    .map(parseIntEx)
    .reduce(sum));
