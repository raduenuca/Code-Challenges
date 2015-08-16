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

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");
    
    var words = curry(splitArray, " ");
    var words = curry(joinArray, " ");
    
    var truncate = function(controlSize, toSize, elipssis, sentence){
        if (sentence.length <= controlSize){
            return sentence;
        }
        
        var trimmed = sentence.substring(0, toSize);
        
        var lastSpace = trimmed.lastIndexOf(" ");
            
        if (lastSpace !== -1){
            trimmed = trimmed.substring(0, lastSpace);
        }
        
        return trimmed + elipssis;
    };
    
    var trim_ = curry(truncate, 55, 40, "... <Read More>");

    var sentences = lines(fs.readFileSync(process.argv[2]).toString())
        .map(trim_);

    console.log(unlines(sentences));
}());

