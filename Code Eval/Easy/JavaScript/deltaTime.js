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

    var map_ = function(fn, array) {
        return array.map(fn);
    };

    var pad = function(num, size) {
        return ('000000000' + num).substr(-size);
    };

    var parseDateTime = function(time) {
        return new Date("1 January 1970, " + time + " UTC");
    };

    var dateDescending = function(a, b) {
        return b.getTime() - a.getTime();
    };

    var sort_ = function(comparer, array) {
        return array.sort(comparer);
    };

    var parseDateTime_ = curry(map_, parseDateTime);
    var sortDatesDescending = curry(sort_, dateDescending);

    var deltaSeconds = function(interval) {
        return (interval[0] - interval[1]) / 1000;
    };
    
    var toHHMMSSString = function(totalSeconds){
        var hour = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor( (totalSeconds - hour * 3600) / 60);
        var seconds = totalSeconds - hour * 3600 - minutes * 60;
        
        return [pad(hour,2), pad(minutes, 2), pad(seconds, 2)].join(":");
    };
    
    var deltas = lines(fs.readFileSync(process.argv[2]).toString())
        .map(words)
        .map(parseDateTime_)
        .map(sortDatesDescending)
        .map(deltaSeconds)
        .map(toHHMMSSString);

    console.log(unlines(deltas));
}());