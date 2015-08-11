var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
    if (line !== "") {
        var menus = JSON.parse(line.trim());

        var sumIds = 0;
        if (typeof menus.menu.items !== "undefined") {
            sumIds = menus.menu.items
                .filter(Boolean)
                .filter(function(item){
                    return typeof item.label !== "undefined";
                }).reduce(function(acc, curr){
                    return  acc + curr.id;
                }, 0);
        }
        
        console.log(sumIds);
    }
});