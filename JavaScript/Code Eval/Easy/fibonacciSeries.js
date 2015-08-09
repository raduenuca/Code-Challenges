var fs = require("fs");

var binnet = function (n) {
    return Math.round((Math.pow(1 + Math.sqrt(5), n) - Math.pow(1 - Math.sqrt(5), n)) / (Math.pow(2, n) * Math.sqrt(5)));
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var nth = parseInt(line.trim());

        console.log(binnet(nth));
    }
});