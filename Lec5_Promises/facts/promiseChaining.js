const fs = require("fs");

// 1. Initial state of promise is pending !
// 2. Promise<pending> => Promise<data> // Promise<error>
// 3. then and catch are always called on pending promise
// 4. then attaches callback function to pending promise known as scb
// 4. catch attaches callback function to pp known as fcb
// 5. then also gives us a pending promise known as thenKaPromise

// async functions => callback use hoga guaranteed !
// callback => async function not guaranteed !

//chaining concept !

let f1KaPromise = fs.promises.readFile("./f1.txt");

f1KaPromise.then(function(data){
    console.log(data+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(data){
    console.log(data+"");
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(data){
    console.log(data+"")
})
.catch(function(error){
    console.log(error);
})



