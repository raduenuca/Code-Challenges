var fs = require("fs");

var planarEuclidianDistance = function(p1, p2){
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().match(/-?[0-9]+/g).map(function(n) {
            return +(n);
        });
        var p1 = input.slice(0, 2);
        var p2 = input.slice(2);

        console.log(planarEuclidianDistance(p1, p2));
    }
});