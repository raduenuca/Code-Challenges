//Sample code to read in test cases:
var fs = require("fs");

// Generates a range of numbers from 1 to n
var generateRange = function(n){
    var sequence = Array.apply(null, {length: n + 1}).map(Number.call, Number);
    sequence.shift();

    return sequence;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var input = line.split(" ");
        var X = parseInt(input[0]);
        var Y = parseInt(input[1]);
        var N = parseInt(input[2]);

        var sequence = generateRange(N);

        console.log(sequence.map(function(index){
            if(index % X === 0 && index % Y === 0){
                return "FB";
            } else if (index % X === 0){
                return "F";
            } else if (index % Y === 0){
                return "B";
            } else {
                return index.toString();
            }
        }).join(" "));
    }
});