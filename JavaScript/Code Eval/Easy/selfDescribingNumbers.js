var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

var isSelfDescribing = function(number) {
    var digits = number.toString().split("").map(parseIntEx);
    var index = 0;
    
    var result = 1;

    for (index; index < digits.length; index = index + 1) {
        var position = 0;
        var numberOfOccurences = -1;
        var startPosition = -1;
        
        while (position != -1) {
            position = digits.indexOf(index, startPosition + 1);
            numberOfOccurences = numberOfOccurences + 1;
            startPosition = position;
        }
        
        if (digits[index] !== numberOfOccurences){
            result = 0;
            break;
        }
    }
    
    return result;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var number = parseInt(line.trim());

        console.log(isSelfDescribing(number));
    }
});