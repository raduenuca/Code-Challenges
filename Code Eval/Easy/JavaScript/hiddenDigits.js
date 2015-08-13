var fs = require("fs");

var figures = "0123456789";
var letters = "abcdefghij";

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var hiddenDigits = line.trim().split("")
            .map(function(digit){
                var figuresIndex = figures.indexOf(digit);
                if(figuresIndex !== -1){
                    return figuresIndex;
                }
                
                var lettersIndex = letters.indexOf(digit);
                if(lettersIndex !== -1){
                    return lettersIndex;
                }
            })
            .filter(function(digit){
                return typeof digit !== "undefined";
            });

        console.log(hiddenDigits.length ? hiddenDigits.join("") : "NONE");
    }
});