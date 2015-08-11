var fs = require("fs");

var parseDigit = function(word){
    return ["zero","one","two","three","four","five","six","seven","eight","nine"].indexOf(word);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        console.log(line.trim().split(";").map(parseDigit).join(""));
    }
});