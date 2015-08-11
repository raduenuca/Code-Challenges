var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var input = line.split(",");
        var word = input[0].trim();
        var chr = input[1].trim();

        if(input !== "" || chr !== ""){
            console.log(word.lastIndexOf(chr));
        }
    }
});