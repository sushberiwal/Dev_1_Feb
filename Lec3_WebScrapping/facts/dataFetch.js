const axios = require("axios");

let path = "https://www.espncricinfo.com/series/ipl-2020-21-1210595?ex_cid=ipl:google_cpc:search:dsa_feed:msn&gclid=Cj0KCQiA0-6ABhDMARIsAFVdQv9h4zxTheJZQYHUB_eAbDSDC8QYHZfrx8YTAlPGcO-lV9_2PRQnh2caAlrCEALw_wcB";

axios.get(path).then( function(data){
    console.log(data);
}  )