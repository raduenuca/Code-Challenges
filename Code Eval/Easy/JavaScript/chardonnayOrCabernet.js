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

    var findWine = function(wine) {
        var wineWords = words(wine[0]);
        var lettersRemembered = letters(wine[1]);

        var searchLettersInWord = curry(isArrayinArray, lettersRemembered);

        //var foundWine = filter_(searchLettersInWord, wineWords);

        var foundWine = filter_(function(word) {
            var wordLetters = letters(word);
            var foundLetters = [];

            for (var i = 0; i < lettersRemembered.length; i++) {
                var letterPosition = wordLetters.indexOf(lettersRemembered[i]);
                if (letterPosition !== -1) {
                    foundLetters.push(lettersRemembered[i]);
                    wordLetters.splice(letterPosition, 1);
                }
            }

            return unletters(foundLetters) === unletters(lettersRemembered);
        }, wineWords);

        return foundWine.length ? foundWine : ["False"];
    };

    var findWine_ = curry(map_, findWine);

    var solution = compose(
        show,
        unlines,
        unwords_,
        findWine_,
        columns_,
        nonEmpty,
        lines);

    solution(fs.readFileSync(process.argv[2]).toString());
}());