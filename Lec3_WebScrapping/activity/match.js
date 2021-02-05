const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

// let path =
//   "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

// request(path, cb);

function getMatch(link){
    request(link , cb);
}

function cb(error, response, data) {
  processHtml(data);
}

function processHtml(html) {
  let ch = cheerio.load(html);
  let bothInningsDiv = ch(".card.content-block.match-scorecard-table .Collapsible");
  // <div class="Collapsible"> </div> , <div class-"Collapsible"> </div>
  for (let i = 0; i < bothInningsDiv.length; i++) {
    // MI
    let teamName = ch(bothInningsDiv[i]).find("h5").text();
    // MUMBAI INDIANS INNINGS AKSIHFKASHFKU => [ "MUMBAI INDIANS " , " AKSIHFKASHFKU"  ];
    teamName = teamName.split("INNINGS")[0].trim();
    console.log(teamName);
    let allTrs = ch(bothInningsDiv[i]).find(".table.batsman tbody tr");
    // { <tr>  <td></td> , <td></td> , <td></td> ,<td></td> </tr> , <tr> <td></td> </tr> ,<tr> </tr> ,<tr> </tr> , <tr> </tr> ,<tr class="extras"> </tr>  }
    for (let j = 0; j < allTrs.length - 1; j++) {
        let allTds = ch(allTrs[j]).find("td");
        // console.log(allTds);
            // '0'                            '2'             '3'                          '5'              '6'              '7'
        // <td>batsmanName</td> ,<td> </td> ,<td>Runs </td>,<td>Balls</td> ,<td> </td> ,<td>Fours</td> ,<td>Sixes</td> , <td>StrikeRate</td> 
        if(allTds.length > 1){
            let batsmanName = ch(allTds[0]).text().trim();
            let runs = ch(allTds[2]).text().trim();
            let balls = ch(allTds[3]).text().trim();
            let fours = ch(allTds[5]).text().trim();
            let sixes = ch(allTds[6]).text().trim();
            let strikeRate = ch(allTds[7]).text().trim();
            console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
        }
    }
    console.log("##########################################################");
  }
}

module.exports = getMatch;
