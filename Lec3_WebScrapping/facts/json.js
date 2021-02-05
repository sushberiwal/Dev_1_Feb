const fs = require("fs");


let obj = {name:"steve"};

fs.writeFileSync("./test.json" , JSON.stringify(obj) );