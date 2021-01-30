// function sayHi(fun){
//     console.log("I am sayHi !!");
//     fun();
//     return 10;
// }
// function fun(){
//     console.log("I am fun !!");
// }
// let val = sayHi(fun);
// console.log(val);
// high order functions => functions which accepts functions as an argument;
// callback functions => functions which are passed as an argumnet in a function call;

function getFirstName(fullName){
    fullName = fullName.split(" ");
    // "STEVE ROGERS" => ["STEVE" , "ROGERS"];
    return fullName[0];
}

function getLastName(fullName){
    fullName = fullName.split(" ");
    // "STEVE ROGERS" => ["STEVE" , "ROGERS"];
    return fullName[1];
}
function fun(fullName , cb ){
    let name = cb(fullName);
    console.log(name);
}



fun("Steve Rogers" , getFirstName);
fun("TONY STARK" ,  getLastName);



