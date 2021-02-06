const fs = require("fs");
const json2xls = require("json2xls");


// ES5 => var => hoisting

// ES6 => EcmaScript 6 => let const 


let jsonData = fs.readFileSync("./abcd.json");
jsonData = JSON.parse(jsonData);

let xls = json2xls(jsonData);

fs.writeFileSync("./abcd.xlsx" , xls , 'binary');