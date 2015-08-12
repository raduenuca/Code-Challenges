var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var words = line.trim().split(" ");

        var longestWord = words.reduce(function(a, b) {
            return a.length >= b.length ? a : b;
        });

        console.log(longestWord);
    }
});