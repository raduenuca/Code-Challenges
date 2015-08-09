var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var trimWord = function(word){ return word.toString().trim();};
        var input = line.split(",").map(trimWord).map(function(arg){
            return parseInt(arg);
        });

        var x = input[0];
        var n = input[1];

        var powerOfN = (n >>> 0).toString(2).length - 1;
        var mod = x & ((1 << powerOfN) - 1);

        var value = (mod === 0) ? x : x + ( n - mod);

        console.log(value);
    }
});