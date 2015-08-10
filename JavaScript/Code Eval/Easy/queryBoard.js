var Matrix = (function(cols, rows, def) {

    var mat = Array.apply(null, new Array(cols)).map(
        Array.prototype.valueOf,
        Array.apply(null, new Array(rows)).map(
            function() {
                return def;
            }
        )
    );
    
    //Private methods
    var sum = function(a, b) {
        return a + b;
    };

    //Public methods
    var setRow = function(row, value) {
        mat[row] = Array.apply(null, new Array(cols)).map(
            function() {
                return value;
            }
        );
    };    
    
    var setCol = function(col, value) {
        mat.forEach(function(element) {
            element[col] = value;
        });
    };

    var queryRow = function(row) {
        console.log(mat[row].reduce(sum));
    };

    var queryCol = function(col) {
        console.log(mat.map(function(element) {
            return element[col];
        }).reduce(sum));
    };    
    
    return {
        SetRow: setRow,
        SetCol: setCol,
        QueryRow: queryRow,
        QueryCol: queryCol
    };

}(256, 256, 0));

var fs = require("fs");

var parseIntEx = function(str) {
    return parseInt(str);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var input = line.trim().split(" ");
        
        var fn = input.shift();
        var args = input.map(parseIntEx);

        Matrix[fn].apply(null, args);
    }
});