var fs = require("fs");

var switchCase = function(letter) {
    if (letter === letter.toLowerCase()) {
        return letter.toUpperCase();
    }
    else {
        return letter.toLowerCase();
    }
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var letters = line.trim().split("").map(switchCase);
        console.log(letters.join(""));
    }
});