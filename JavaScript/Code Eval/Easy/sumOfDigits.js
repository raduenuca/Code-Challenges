var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var sum = function (a, b) {
            return a + b;
        };

        var parseIntEx = function (str) {
            return parseInt(str);
        };

        console.log(line.trim().split("").map(parseIntEx).reduce(sum));
    }
});