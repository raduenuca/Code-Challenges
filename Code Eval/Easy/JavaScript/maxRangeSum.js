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

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");

    var words = curry(splitArray, " ");
    var unwords = curry(joinArray, " ");

    var nonEmpty = curry(filter_, Boolean);
    var letters = curry(splitArray, "");
    var unletters = curry(joinArray, "");

    var words_ = curry(map_, words);
    var unwords_ = curry(map_, unwords);

    var parseInt_ = function(value) {
        return +value;
    };
    var convertToNumberArray = curry(map_, parseInt_);

    var sum = function(a, b) {
        return a + b;
    };

    var getMaxOfArray = function(numArray) {
        return Math.max.apply(null, numArray);
    };

    var maxRangeSum = function(range) {
        var days = +range[0];
        var values = compose(convertToNumberArray, words)(range[1]);

        var i, rangeLength = values.length,
            computeGain = curry(reduce_, sum, undefined);
            
            var maxGain = 0;
            
        for (i = 0; i < rangeLength - days + 1; i++) {
            var gain = computeGain(values.slice(i, days + i));
            maxGain = maxGain < gain ? gain : maxGain;
        }

        return maxGain;
    };

    var maxRangeSum_ = curry(map_, maxRangeSum);

    var solution = compose(
        show,
        unlines,
        maxRangeSum_,
        curry(map_, curry(splitArray, ";")),
        nonEmpty,
        lines);

    solution(fs.readFileSync(process.argv[2]).toString());
}());