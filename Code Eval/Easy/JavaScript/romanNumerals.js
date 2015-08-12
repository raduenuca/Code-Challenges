var fs = require("fs");

var parseIntEx = function(value) {
    return +value;
};

var parseRoman = function(value) {
    var romanNumeralsMap = {
        "1": "I",
        "5": "V",
        "10": "X",
        "50": "L",
        "100": "C",
        "500": "D",
        "1000": "M"
    };

    var digits = value.split("").map(parseIntEx);

    return digits.map(function(digit, index, array) {
        var powerOfTen = array.length - index - 1;
        var powerOfTenValue = Math.pow(10, powerOfTen);

        var currentPowerOfTenLiteral = romanNumeralsMap[powerOfTenValue];
        var currentPowerOfTenFiveLiteral = romanNumeralsMap[5 * powerOfTenValue];

        if (digit + 1 === 5){
            return currentPowerOfTenLiteral + currentPowerOfTenFiveLiteral;
        }

        if( (digit + 1) * Math.pow(10, powerOfTen - 1)  ===  powerOfTenValue){
            return currentPowerOfTenLiteral + romanNumeralsMap[powerOfTenValue * 10];
        }

        if(digit > 5){
            return currentPowerOfTenFiveLiteral + Array(digit - 5 + 1).join(currentPowerOfTenLiteral);
        }

        return digit === 5 ? currentPowerOfTenFiveLiteral : Array(digit + 1).join(currentPowerOfTenLiteral);
    }).join("");
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    console.log(parseRoman(line.trim()));
});