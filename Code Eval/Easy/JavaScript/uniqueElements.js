var fs = require("fs");

var parseIntEx = function (str) {
    return parseInt(str);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var numbers = line.split(",").map(parseIntEx);

        var distinct = [];

        numbers.forEach(function(number){
           if(distinct[distinct.length - 1] !== number){
               distinct.push(number);
           }
        });
        console.log(distinct.join(","));
    }
});