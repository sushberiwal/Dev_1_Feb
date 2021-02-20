let fs = require("fs");
// async keyword function body

// sync fun
function fun(){
    console.log("I am fun !!");
}
// fun();


// async fun returns a promise
async function fun(){
    console.log("I am async fun !!");
}

// fun();

// async keyword => function will be exectued on Node API
// await keyword can only be used inside async function !!

// NODE API
async function fun(){
    try{
        let f1KaData = await fs.promises.readFile("./f1.txt");
        let f2KaData =await fs.promises.readFile("./f2.txt");
        // let data = await Promise.all([ f1KaPromise , f2KaPromise ]);
        console.log(data);
    }
    catch(error){
        return error;
    }
}

fun();

