var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

var joinArray = function(chr) {
    return function(arr) {
        return arr.join(chr);
    };
};

var splitArray = function(chr) {
    return function(arr) {
        return arr.split(chr);
    };
};

var words = splitArray(" ");
var unwords = joinArray(" ");

var lines = splitArray("\n");
var unlines = joinArray("\n");

var replacer = function(number, pattern) {
    var format = pattern.replace(
        new RegExp("([a-z]+)([-+])([a-z]+)", "g"),
        function(match, first, operation, second, offset, string) {
            return "(\\d{" + first.length + "})(\\d{" + second.length + "});" + operation;
        }
    );

    return eval(number.toString().replace(
        new RegExp(format.split(";")[0], "g"),
        "(+\"$1\")" + format.split(";")[1] + "(+\"$2\")"
    ));
};

var entries = lines(fs.readFileSync(process.argv[2]).toString())
    .map(function(entry) {
        var input = words(entry);
        var number = +input[0];
        var pattern = input[1];
        
        if(typeof pattern !== "undefined"){
            return replacer(number, pattern);
        }
    })
    .filter(Boolean);

console.log(unlines(entries));