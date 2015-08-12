var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split(":");

        var list = input[0].trim().split(" ").map(parseIntEx);
        var swapList = input[1].trim().split(", ")
            .map(function(elem) {
                return elem.split("-").map(parseIntEx);
            });

        swapList.forEach(function(swap) {
            //With Splice
            //list[swap[0]] = list.splice(swap[1], 1, list[swap[0]])[0];
            
            //Standard temp variable (faster it seems)
            var temp = list[swap[0]];
            list[swap[0]] = list[swap[1]];
            list[swap[1]] = temp;
        });

        console.log(list.join(" "));
    }
});