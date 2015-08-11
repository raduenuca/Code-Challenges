var fs = require("fs");

var parseFloatEx = function(str) {
    return parseFloat(str);
};

var ascending = function(a, b){
    return a - b;
};

var showThreeDecimals = function(number){
    return number.toFixed(3);
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split(" ")
            .map(parseFloatEx)
            .sort(ascending);

        console.log(input.map(showThreeDecimals).join(" "));
    }
});