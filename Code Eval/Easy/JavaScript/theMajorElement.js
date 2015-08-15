var fs = require("fs");

var curry = function (func) {
    var initialArgs = [].slice.apply(arguments, [1]);
    var funcArgsLength = func.length;

    var curried = function(args) {
        if (args.length >= funcArgsLength) {
            return func.apply(null, args);
        }

        return function () {
            return curried(args.concat([].slice.apply(arguments)));
        };
    };

    return curried(initialArgs);
};

var joinArray = function(chr, array) {
    return array.join(chr);
};

var splitArray = function(chr, array) {
    return array.split(chr);
};

var lines = curry(splitArray, "\n");
var unlines = curry(joinArray, "\n");

var csv = curry(splitArray, ",");

var map_ = function(fn, array){
    return array.map(fn);
};

var reduce_ = function(fn, array, acc){
    if (typeof acc === "undefined" || acc === null){
        return array.reduce(fn);    
    }
    
    return array.reduce(fn, acc);
};

var parseInt_ = function(value){
    return +value;
};

var generateArray = function(size, init){
    return Array.apply(null, {length: size + 1})
        .map(function() { return init;});
};

var getMaxOfArray = function(array) {
    return Math.max.apply(null, array);
};

var convertToNumberArray = curry(map_, parseInt_);

var distinct = function(acc, curr) {
    if (!Array.isArray(acc)){
        acc = generateArray(100, 0);
    }
    
    var currentElement = acc[curr];
    if (typeof currentElement !== "undefined") {
        currentElement = currentElement + 1;
    }
    else {
        currentElement = 1;
    }

    acc[curr] = currentElement;
    return acc;
};

var sum = function(a, b){
    return a + b;
};

var appearances = curry(reduce_, distinct);

var computeMajorElements = function(array){
    var maxElement = getMaxOfArray(array);
    var sequenceLength = array.reduce(sum);
    if( maxElement >= sequenceLength / 2){
        return array.indexOf(maxElement);
    }
    
    return "None";
};

var majorElements = lines(fs.readFileSync(process.argv[2]).toString())
    .map(csv)
    .map(convertToNumberArray)
    .map(appearances)
    .map(computeMajorElements);

console.log(unlines(majorElements));