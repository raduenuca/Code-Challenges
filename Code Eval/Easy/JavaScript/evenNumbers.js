var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    console.log(Math.abs((+line.trim() & 1) - 1));
});