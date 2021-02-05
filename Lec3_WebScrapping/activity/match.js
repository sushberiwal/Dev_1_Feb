// convert json data into excel sheet

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
    // MUMBAI INDIANS INNINGS AKSIHFKASHFKU => [  "MUMBAI INDIANS " , " AKSIHFKASHFKU"  ];
    let teamName = ch(bothInningsDiv[i]).find("h5").text().split("INNINGS")[0].trim();
    let opponentTeam = ch(bothInningsDiv[ i == 0 ? 1 : 0]).find("h5").text().split("INNINGS")[0].trim();
    
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
            processDetails(teamName , opponentTeam , batsmanName , runs , balls , fours , sixes , strikeRate);
          }
        }
        console.log("##########################################################");
      }
    }


    function checkTeamFolder(teamPath){
      return fs.existsSync(teamPath);
    }

    function checkBatsmanFile(batsmanPath){
      return fs.existsSync(batsmanPath);
    }

    function updateBatsmanFile(batsmanPath , opponentTeam , runs , balls , fours , sixes , strikeRate){
      let batsmanFile = fs.readFileSync(batsmanPath);
      // stringified form me data aayega
      batsmanFile = JSON.parse(batsmanFile);
      let inning = {
        Opponent : opponentTeam ,
        Runs : runs ,
        Balls : balls ,
        Fours : fours , 
        Sixes : sixes , 
        SR : strikeRate
      }
      batsmanFile.push(inning);
      fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
    }

    function createBatsmanFile(batsmanPath , opponentTeam , runs , balls , fours , sixes , strikeRate){
      // "./IPL/Mumbai Indians/askj.json"
      let batsmanFile = [];
      let inning = {
        Opponent : opponentTeam ,
        Runs : runs ,
        Balls : balls ,
        Fours : fours , 
        Sixes : sixes , 
        SR : strikeRate
      }
      batsmanFile.push(inning);
      fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
    }
    function createTeamFolder(teamPath){
      fs.mkdirSync(teamPath);
    }

    
    
function processDetails(teamName , opponentTeam , batsmanName , runs , balls , fours , sixes , strikeRate){
  let teamPath = `./IPL/${teamName}`;
  let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`; 
  let isTeamFolder = checkTeamFolder(teamPath);
  if(isTeamFolder){
    let isBatsman = checkBatsmanFile(batsmanPath);
    if(isBatsman){
      updateBatsmanFile(batsmanPath , opponentTeam , runs , balls , fours , sixes , strikeRate );
    }
    else{
      createBatsmanFile(batsmanPath , opponentTeam , runs , balls , fours , sixes , strikeRate);
    }
  }
  else{
    createTeamFolder(teamPath);
    createBatsmanFile(batsmanPath , opponentTeam , runs , balls , fours , sixes , strikeRate);
  }
}



module.exports = getMatch;
