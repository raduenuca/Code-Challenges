var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

var arrayMultiply = function(arr1, arr2) {
    //Assuming same length
    return arr1.map(function(elem, index, arr){
        return elem * arr2[index];
    });
    
    // var i = 0;
    // while (arr1.length) {
    //     arr2.splice(i, 1, arr2[i++] * arr1.shift());
    // }

    // return arr2;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split("|");

        var list_one = input[0].trim().split(" ").map(parseIntEx);
        var list_two = input[1].trim().split(" ").map(parseIntEx);

        console.log(arrayMultiply(list_one, list_two).join(" "));
    }
});