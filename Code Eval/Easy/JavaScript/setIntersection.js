var fs = require("fs");

var parseIntEx = function (str) {
    return parseInt(str);
};

var isInArray = function (arr) {
    return function (val) {
        return arr.indexOf(val) !== -1;
    };
};

var intersect = function (a, b) {
    var isInSetB = isInArray(b);
    return a.filter(isInSetB);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var sets = line.split(";");
        var setA = sets[0].split(",").map(parseIntEx);
        var setB = sets[1].split(",").map(parseIntEx);

        console.log(intersect(setA, setB).join(","));
    }
});