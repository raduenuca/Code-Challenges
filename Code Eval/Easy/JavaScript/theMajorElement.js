(function() {
    var fs = require("fs");

    var curry = function(func) {
        var initialArgs = [].slice.apply(arguments, [1]);
        var funcArgsLength = func.length;

        var curried = function(args) {
            if (args.length >= funcArgsLength) {
                return func.apply(null, args);
            }

            return function() {
                return curried(args.concat([].slice.apply(arguments)));
            };
        };

        return curried(initialArgs);
    };

    var compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length; i-- > 0;) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };

    var filter_ = function(fn, arr) {
        var length = arr.length,
            result = [],
            i;
        for (i = 0; i < length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    };

    var forEach_ = function(fn, arr) {
        var length = arr.length,
            i;

        for (i = 0; i < length; i++) {
            fn(arr[i], i, arr);
        }
    };

    var map_ = function(fn, arr) {
        var length = arr.length,
            result = new Array(length),
            i;

        for (i = 0; i < length; i++) {
            result[i] = fn(arr[i], i, arr);
        }
        return result;
    };

    var reduce_ = function(fn, accumulator, arr) {
        var length = arr.length,
            i, result;

        if (accumulator === undefined) {
            i = 1;
            result = arr[0];
        }
        else {
            i = 0;
            result = accumulator;
        }

        for (; i < length; i++) {
            result = fn(result, arr[i], i, arr);
        }

        return result;
    };

    var joinArray = function(chr, array) {
        return array.join(chr);
    };

    var splitArray = function(chr, array) {
        return array.split(chr);
    };

    var show = function(value) {
        console.log(value);
    };

    var getMaxOfArray = function(array) {
        return Math.max.apply(null, array);
    };

    var generateArray = function(size, init) {
        return Array.apply(null, {
                length: size + 1
            })
            .map(function() {
                return init;
            });
    };

    var parseInt_ = function(value) {
        return +value;
    };

    var distinct = function(acc, curr) {
        if (!Array.isArray(acc)) {
            var init = acc;
            acc = generateArray(100, 0);
            acc[init] = 1;
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

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");

    var words = curry(splitArray, " ");
    var concat = curry(joinArray, "");

    var csv = curry(splitArray, ",");

    var readCsv = curry(map_, csv);
    var convertToNumberArray = curry(map_, parseInt_);
    var countAppearances = curry(reduce_, distinct, undefined);

    var sum = function(a, b) {
        return a + b;
    };
    
    var nonEmpty = curry(filter_, Boolean);

    var computeMajorElements = function(array) {
        var maxElement = getMaxOfArray(array);
        var sequenceLength = reduce_(sum, undefined, array);
        if (maxElement >= sequenceLength / 2) {
            return array.indexOf(maxElement);
        }

        return "None";
    };

    var computeMajorElements_ = curry(map_, computeMajorElements);
    var countAppearances_ = curry(map_, countAppearances);
    var convertToNumberArray_ = curry(map_, convertToNumberArray);

    var computeMajorElement = compose(
        computeMajorElements_,
        countAppearances_,
        convertToNumberArray_,
        readCsv);

    var majorElements = compose(show, unlines, computeMajorElement, nonEmpty, lines);

    majorElements(fs.readFileSync(process.argv[2]).toString());
}());