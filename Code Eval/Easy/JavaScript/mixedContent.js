var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split(",");

        var entryLength = input.length;
        if (entryLength === input.filter(isFinite).length ||
            entryLength === input.filter(isNaN).length) {
            console.log(input.join(","));
        }
        else {
            input = input.reduce(function(acc, curr) {
                    if (isNaN(curr)) {
                        acc[0].push(curr);
                    }
                    else {
                        acc[1].push(curr);
                    }

                    return acc;
                }, [ [], [] ])
                .map(function(elem) {
                    return elem.join(",");
                });


            console.log(input.join("|"));
        }

    }
});