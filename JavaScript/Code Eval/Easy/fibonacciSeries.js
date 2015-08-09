var fs = require("fs");

var binet = function (n) {
    if (n === 0) {return 0;}
    if (n === 1) {return 1;}

    return Math.round((Math.pow(1 + Math.sqrt(5), n) - Math.pow(1 - Math.sqrt(5), n)) / (Math.pow(2, n) * Math.sqrt(5)));
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var nth = parseInt(line.trim());

        console.log(binet(nth));
    }
});