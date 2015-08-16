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
    
    var parseFloat_ = function(value){
        return parseFloat(value);            
    };
    
    var pad = function(num, size){
        return ('000000000' + num).substr(-size);
    };
    
    var parseDegreesMinutesSeconds = function(decimalDegree){
        var degrees = Math.floor(decimalDegree);
        var minutes = Math.floor((decimalDegree- degrees) * 60);
        var seconds = Math.floor((decimalDegree - degrees - minutes/60) * 3600);

        
        return degrees + "." + pad(minutes, 2) + "'" + pad(seconds, 2) +"\"";
    };

    var angles = lines(fs.readFileSync(process.argv[2]).toString())
        .map(parseFloat_)
        .map(parseDegreesMinutesSeconds);

    console.log(unlines(angles));
}());