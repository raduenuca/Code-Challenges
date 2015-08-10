var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var input = line.trim().split(",").map(parseIntEx);

        var N = input[0];
        var M = input[1];

        var mod = N - M * Math.floor(N/M);

        console.log(mod);
    }
});