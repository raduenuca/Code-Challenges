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

    var find_ = function(fn, arr) {
        var length = arr.length,
            result = undefined,
            i;
        for (i = 0; i < length; i++) {
            if (arr[i] && fn(arr[i], i, arr)) {
                result = arr[i];
                break;
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

    var isInArray = function(arr) {
        return function(val) {
            return arr.indexOf(val) !== -1;
        };
    };

    var isArrayinArray = function(needle, haystack) {
        for (var i = 0; i < needle.length; i++) {
            if (haystack.indexOf(needle[i]) === -1)
                return false;
        }
        return true;
    };

    var intersect = function(a, b) {
        var isInSetB = isInArray(b);
        return a.filter(isInSetB);
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

    var columns = curry(splitArray, " | ");
    var columns_ = curry(map_, columns);

    var getMaxOfArray = function(numArray) {
        return Math.max.apply(null, numArray);
    };

    var matrix = function(rows, cols, init) {
        var mat = [];
        for (var i = 0; i < rows; ++i) {
            var columns = [];
            for (var j = 0; j < cols; ++j) {
                columns[j] = init;
            }
            mat[i] = columns;
        }
        return mat;
    };

    var parseInt_ = function(value) {
        return +value;
    };

    var convertToIntArray = curry(map_, parseInt_);
    var convertToIntArray_ = curry(map_, convertToIntArray);

    var sign = function(x) {
        return typeof x === 'number' ? x ? x < 0 ? "-" : "+" : x === x ? "0" : NaN : NaN;
    };

    var manhattanDistance

    var minimumDistance = compose(
        function(arr) {
            var sum = Number.MAX_VALUE;
            for (var i = 1; i < 10000; i++) {
                var sumTemp = 0;
                for(var j=1; j<arr.length; j++){
                    sumTemp += Math.abs(i-arr[j]);
                }
                
                if(sumTemp < sum){
                    sum = sumTemp;
                }
            }
            
            return sum;
        },
        convertToIntArray
    );

    var minimumDistance_ = curry(map_, minimumDistance);

    var solution = compose(
        show,
        unlines,
        minimumDistance_,
        words_,
        nonEmpty,
        lines);

    solution(fs.readFileSync(process.argv[2]).toString());
}());