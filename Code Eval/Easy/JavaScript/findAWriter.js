var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split("|");
        var writerCode = input[0].split("");
        var key = input[1].trim().split(" ").map(parseIntEx);

        // var writer = key.map(function(keyPart){
        //   return writerCode[keyPart - 1];
        // }).join("");

        var writer = key.reduce(function(w, keyPart) {
            return w + writerCode[keyPart - 1];
        }, "");

        console.log(writer);
    }
});