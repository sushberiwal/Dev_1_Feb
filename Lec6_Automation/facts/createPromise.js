const fs = require("fs");

function readFilePromisified(filePath){
    return new Promise( function(resolve , reject){
        fs.readFile(filePath , function(err , data){
            if(err){
                // failed
                reject("I failed !!");
            }else{
                // success
                resolve("hey how are u !!");
            }
        })
    });
}






const f1KaPromise = readFilePromisified("./f1.txt");

f1KaPromise.then(function(data){
    console.log(data);
});
f1KaPromise.catch(function(error){
    console.log(error);
});