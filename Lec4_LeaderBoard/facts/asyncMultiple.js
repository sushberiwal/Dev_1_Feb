const fs = require("fs");


console.log("start");

fs.readFile("./f1.txt" , function(err , data){
    console.log(data+""); // 
})

fs.readFile("./f2.txt" , function(err , data){
    console.log(data+"");
})

fs.readFile("./f3.txt" , function(err , data){
    console.log(data+"");
})


console.log("end");


// f1 // f2 // f3
// we have to use async function