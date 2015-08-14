var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};
var countAppearances = function(acc, curr) {
    if (acc.length === 0){
        acc.push([1, curr]);
        return acc;
    }
    
    var lastEntry = acc[acc.length - 1];
    if (lastEntry[1] !== curr) {
        acc.push([1, curr]);
    }
    else {
        lastEntry[0] += 1;
    }

    return acc;
};

var joinArray = function(chr) {
    return function(arr) {
        return arr.join(chr);
    };
};

var words = joinArray(" ");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var numbers = line.split(" ").map(parseIntEx);

        console.log(words(numbers.reduce(countAppearances, []).map(words)));
    }
});