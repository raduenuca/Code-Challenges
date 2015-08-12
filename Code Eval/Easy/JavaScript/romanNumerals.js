var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

var parseRoman = function(value) {
    var romanNumerals = {
        "1": "I",
        "4": "IV",
        "5": "V",
        "9": "IX",
        "10": "X",
        "40": "XL",
        "50": "L",
        "90": "XC",
        "100": "C",
        "400": "CD",
        "500": "D",
        "900": "CM",
        "1000": "M"
    };

    var digits = value.split("").map(parseIntEx);

    var decomposed = digits.map(function(digit, index, array) {
        var zeroes =Array(array.length - index).join("0");
        var stringRepresentation = digit.toString() + zeroes;
        
        if(typeof romanNumerals[stringRepresentation] !== "undefined"){
            return romanNumerals[stringRepresentation];
        }
        
        var literal = romanNumerals["1" + zeroes];        
        
        if (array.length - index === 4) {
            return Array(digit + 1).join("M");
        }

        if (array.length - index === 3) {
            if(digit > 5){
                return "D" + Array(digit - 5 + 1).join("C");
            }
            
            return Array(digit + 1).join("C");
        }

        if (array.length - index === 2) {
            if(digit > 5){
                return "L" + Array(digit - 5 + 1).join("X");
            }            
            
            return Array(digit + 1).join("X");
        }

        if (array.length - index === 1) {
            if(digit > 5){
                return "V" + Array(digit - 5 + 1).join("I");
            }            
            
            return Array(digit + 1).join("I");
        }
    }).join("");

    return decomposed;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    console.log(parseRoman(line.trim()));
});