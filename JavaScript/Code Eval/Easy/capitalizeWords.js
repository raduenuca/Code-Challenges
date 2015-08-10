var fs = require("fs");

var capitalize = function(word){
    return word.replace(/(?:^|\s)\S/g, function(letter) { return letter.toUpperCase(); });
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var words = line.split(" ").map(capitalize);
        console.log(words.join(" "));
    }
});