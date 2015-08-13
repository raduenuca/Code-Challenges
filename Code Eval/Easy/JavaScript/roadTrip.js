var fs = require("fs");

var ascending = function(a, b){
    return a - b;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var distances = line.trim().split(";")
            .map(function(value){
                return +(value.trim().split(",")[1]);
            })
            .filter(Boolean)
            .sort(ascending)
            .reduce(function(acc, curr){
                acc[acc.length - 1] =  curr - acc[acc.length - 1];
                acc.push(curr);
                return acc;
            }, [0]);
            distances.pop();
            
        console.log(distances.join(","));
    }
});