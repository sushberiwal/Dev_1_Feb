const fs = require("fs");
const json2xls = require("json2xls");

let jsonData = fs.readFileSync("./abcd.json");
jsonData = JSON.parse(jsonData);

let xls = json2xls(jsonData);

fs.writeFileSync("./abcd.xlsx" , xls , 'binary');