var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split("|");
        var writerCode = input[0].trim().split("");
        var key = input[1].trim().split(" ");
        
        var writer = key.map(function(keyPart){
           return writerCode[keyPart - 1];
        }).join("");
        
        console.log(writer);
    }
});