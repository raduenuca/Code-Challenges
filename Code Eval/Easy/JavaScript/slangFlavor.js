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

    var parseInt_ = function(value) {
        return +value;
    };

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");

    var nonEmpty = curry(filter_, Boolean);
    var letters = curry(splitArray, "");
    var unletters = curry(joinArray, "");

    var replaceStringAt = function(origStr, index, newStr) {
        return origStr.substr(0, index) + newStr + origStr.substr(index + 1);
    };

    var slangFlavor = function(str) {

        var punctuationMarks = [".", "!", "?"];

        var slangs = [
            ", yeah!",
            ", this is crazy, I tell ya.",
            ", can U believe this?",
            ", eh?",
            ", aw yea.",
            ", yo.", "? No way!",
            ". Awesome!"
        ];

        var punctuationMarksPositions = function(elem, index) {
            if (punctuationMarks.indexOf(elem) !== -1) {
                return index;
            }
        };

        var punctuationMarksPositions_ = curry(map_, punctuationMarksPositions);
        punctuationMarksPositions = compose(nonEmpty, punctuationMarksPositions_)(str);

        var i = 1,
            j = 0,
            len = punctuationMarksPositions.length,
            addLen = 0;
        for (i; i <= len - 1; i = i + 2) {
            str = replaceStringAt(str, punctuationMarksPositions[i] + addLen, slangs[j]);
            addLen = addLen + slangs[j].length - 1;
            j = j + 1;
            if(j >= slangs.length){
                j = 0;
            }
        }

        return str;
    };

    var solution = compose(show, slangFlavor);

    solution(fs.readFileSync(process.argv[2]).toString());
}());