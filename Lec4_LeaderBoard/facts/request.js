const request = require("request");

const fs = require("fs");

request("https://www.pepcoding.com" , function(error , response , data){
    fs.writeFileSync("response.json" , JSON.stringify(response));
})