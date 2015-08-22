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

    var numbersOnly = function(str){
        return str.replace(/[^0-9]/g, "");
    };

    var zero = ["-**--", "*--*-", "*--*-", "*--*-", "-**--", "-----"];
    var one = ["--*--", "-**--", "--*--", "--*--", "-***-", "-----"];
    var two = ["***--", "---*-", "-**--", "*----", "****-", "-----"];
    var three = ["***--", "---*-", "-**--", "---*-", "***--", "-----"];
    var four = ["-*---", "*--*-", "****-", "---*-", "---*-", "-----"];
    var five = ["****-", "*----", "***--", "---*-", "***--", "-----"];
    var six = ["-**--", "*----", "***--", "*--*-", "-**--", "-----"];
    var seven = ["****-", "---*-", "--*--", "-*---", "-*---", "-----"];
    var eight = ["-**--", "*--*-", "-**--", "*--*-", "-**--", "-----"];
    var nine = ["-**--", "*--*-", "-***-", "---*-", "-**--", "-----"];

    var bigNumbers = [zero, one, two, three, four, five, six, seven, eight, nine];

    var combineBigNumbers = function(numbersArray) {
        var i, len = numbersArray.length;

        var bigDigits = ["", "", "", "", "", ""];

        for (i = 0; i < len; i = i + 1) {
            var currentNumber = +numbersArray[i];
            bigDigits[0] += bigNumbers[currentNumber][0];
            bigDigits[1] += bigNumbers[currentNumber][1];
            bigDigits[2] += bigNumbers[currentNumber][2];
            bigDigits[3] += bigNumbers[currentNumber][3];
            bigDigits[4] += bigNumbers[currentNumber][4];
            bigDigits[5] += bigNumbers[currentNumber][5];
        }

        return bigDigits;
    };

    var bigDigits_ = curry(map_, combineBigNumbers);
    var solution = compose(show, unlines, curry(map_, unlines), bigDigits_ , curry(map_, numbersOnly) ,nonEmpty, lines);

    solution(fs.readFileSync(process.argv[2]).toString());
}());