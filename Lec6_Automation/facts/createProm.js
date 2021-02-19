let promise = new Promise(function(resolve , reject){
    // resolve(); => scb
    // reject(); => fcb
    // resolve("I am scb");
    reject("I am fcb");
});

// scb
promise.then(function(data){
    console.log(data);
});
// fcb
promise.catch(function(error){
    console.log(error);
})

