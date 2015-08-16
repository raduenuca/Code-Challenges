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

    var joinArray = function(chr, array) {
        return array.join(chr);
    };

    var splitArray = function(chr, array) {
        return array.split(chr);
    };

    var map_ = function(fn, array) {
        return array.map(fn);
    };

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");

    var words = curry(splitArray, " ");
    var unwords = curry(joinArray, " ");

    var breakup = curry(splitArray, ";");

    var words_ = curry(map_, words);

    var concat_ = function(array) {
        return [].concat.apply([], array);
    };

    var generateArray = function(size, init) {
        return Array.apply(null, {
                length: size + 1
            })
            .map(function() {
                return init;
            });
    };

    var sequenceCode = function(entry) {
        return {
            sequence: entry[0],
            code: entry[1]
        };
    };

    var decode = function(codedSequence) {
        var sequenceLength = codedSequence.sequence.length;
        var decodedSequence = generateArray(sequenceLength, "???");

        var i = 0;

        for (i; i < sequenceLength; i = i + 1) {
            var position = +codedSequence.code[i];
            var word = codedSequence.sequence[i];

            if (!isNaN(position)) {
                decodedSequence[position] = word;
                codedSequence.sequence[i] = "???";
            }
        }

        decodedSequence.shift();

        var missingWord = codedSequence.sequence.filter(function(word){ return word !== "???"});

        decodedSequence.splice(decodedSequence.indexOf("???"), 1, missingWord);

        return decodedSequence;
    };

    var sentence = lines(fs.readFileSync(process.argv[2]).toString())
        .filter(Boolean)
        .map(breakup)
        .map(words_)
        .map(sequenceCode)
        .map(decode)
        .map(unwords);

    console.log(unlines(sentence));
}());