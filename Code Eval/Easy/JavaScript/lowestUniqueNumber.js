var fs = require("fs");

var generateZeroFilledArray = function(size) {
    return Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
};

var parseIntEx = function(value){
    return +value;
};

var countOccurences = function(occurences, element) {
    occurences[element - 1] += 1;

    return occurences;
};

var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

var getMinOfArray = function (numArray) {
  return Math.min.apply(null, numArray);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var numbers = line.trim().split(" ").map(parseIntEx);
        var maxNumber = getMaxOfArray(numbers);
        
        var uniqueEntries = numbers
            .reduce(countOccurences, generateZeroFilledArray(maxNumber))
            .map(function(element, index, array){
                if(element === 1){
                    return index + 1; 
                }
            })
            .filter(Boolean);
            
        var winner = 0;
        
        if(uniqueEntries.length > 0){
            var lowestEntry = getMinOfArray(uniqueEntries);
            winner = numbers.indexOf(lowestEntry) + 1;
        }
        
        console.log(winner);
    }
});