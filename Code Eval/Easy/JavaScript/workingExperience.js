var fs = require("fs");

var getMonth = function(monthName) {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthName);
};

var dateAscending = function(a, b) {
    return a[0].getTime() - b[0].getTime();
};

var isOverlap = function(int1, int2) {
    return (int1[0] <= int2[1]) && (int1[1] >= int2[0]);
};

var getMonths = function(interval) {
    var year1 = interval[0].getFullYear();
    var year2 = interval[1].getFullYear();
    var month1 = interval[0].getMonth();
    var month2 = interval[1].getMonth();
    if (month1 === 0) { //Have to take into account
        month1++;
        month2++;
    }
    var numberOfMonths;

    numberOfMonths = (year2 - year1) * 12 + (month2 - month1) + 1;

    return numberOfMonths;
};

var sum = function(a, b) {
    return a + b;
};

var firstDayOfMonthDate = function(month, year) {
    return new Date(year, getMonth(month), 1);
};

var lastDayOfMonthDate = function(month, year) {
    return new Date(year, getMonth(month) + 1, 0);
};

var removeOverlapping = function(acc, curr) {
    if (acc.length === 0) {
        acc.push(curr);
        return acc;
    }

    var prev = acc[acc.length - 1];
    if (isOverlap(prev, curr)) {
        prev[0] = prev[0] <= curr[0] ? prev[0] : curr[0];

        prev[1] = prev[1] <= curr[1] ? curr[1] : prev[1];

        acc[acc.length - 1] = prev;
        return acc;
    }

    acc.push(curr);
    return acc;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var intervals = line.split("; ")
            .map(function(interval) {
                return interval.split("-");
            })
            .map(function(interval) {
                var startInterval = interval[0].split(" ");
                var endInterval = interval[1].split(" ");

                var startDate = firstDayOfMonthDate(startInterval[0], startInterval[1]);
                var endDate = lastDayOfMonthDate(endInterval[0], endInterval[1]);

                return [startDate, endDate];
            });

        intervals.sort(dateAscending);

        intervals = intervals.reduce(removeOverlapping, [])
            .map(getMonths)
            .reduce(sum);

        console.log(Math.floor(intervals / 12));
    }
});