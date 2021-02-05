const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

// hof
let path = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";



request(path , cb );  



function cb(error , response , html){
    if(error == null){
        // succesfully data aa chuka hai
        processHtml(html);
    }else if(response.statusCode == "404"){
        console.log("Page not found !!");
    }else{
        console.log(error);
    }
}


function processHtml(html){
    let ch = cheerio.load(html);
    let aTag = ch(".widget-items.cta-link a"); // <a href="somelink">   </a>
    let link = aTag.attr("href");
    let completeLink = "https://www.espncricinfo.com"+link;
    // console.log(completeLink);
    getAllMatches(completeLink);
}




