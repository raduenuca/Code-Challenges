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

var letters = curry(splitArray, "");
var unletters = curry(joinArray, "");

var computeTurn = function(previousTurn, currentTurn) {
    if (previousTurn === currentTurn) {
        return "|";
    }
    if (previousTurn > currentTurn) {
        return "/";
    }

    return "\\";
};

var computeExits = function(section) {
    var gate = section.indexOf("_");
    var checkPoint = section.indexOf("C");

    return {
        section: section,
        exit: checkPoint !== -1 ? checkPoint : gate
    };
};

var addTurns = function(track, currentSection) {
    var turn = "|";

    if (track.length > 0) {
        var previousSection = track[track.length - 1];
        turn = computeTurn(previousSection.exit, currentSection.exit);
    }

    var section = letters(currentSection.section);
    section.splice(currentSection.exit, 1, turn);
    currentSection.section = unletters(section);
    track.push(currentSection);

    return track;
};

var flatten = function(currentSection) {
    return currentSection.section;
};

var raceTrack = lines(fs.readFileSync(process.argv[2]).toString())
    .map(computeExits)
    .reduce(addTurns, [])
    .map(flatten);

console.log(unlines(raceTrack));