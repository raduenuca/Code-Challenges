var fs = require("fs");

var morseCodeLetters = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--.."
];

var morseCodeFigures = [
    "-----",
    ".----",
    "..---",
    "...--",
    "....-",
    ".....",
    "-....",
    "--...",
    "---..",
    "----."
];

var parseMorse = function(word) {
    var letters = word.split(" ");

    return letters.map(function(letter){
        var figureIndex = morseCodeFigures.indexOf(letter);
        if( figureIndex !== -1){
            return figureIndex;
        } else {
            return String.fromCharCode(morseCodeLetters.indexOf(letter) + 65);
        }
    }).join("");
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var words = line.trim().split("  ");
        console.log(words.map(parseMorse).join(" "));
    }
});