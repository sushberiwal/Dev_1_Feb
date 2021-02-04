// FS module => nodejs module
// import

const fs = require("fs");


// read a file

// low level data =>  buffer data
let f1KaData = fs.readFileSync("../Lec1_JS_Intro/f1.txt");
console.log(f1KaData+"");

