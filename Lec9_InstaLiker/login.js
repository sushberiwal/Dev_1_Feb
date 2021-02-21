const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");



// IIFE => Immediately Invoked Function Expressions
(async function () {
  try{
      let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
      slowMo:50
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector('input[name="username"]' , {visible:true});
    await tab.type('input[name="username"]' , id);
    await tab.type('input[name="password"]' , pw);
    await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}), tab.click('.sqdOP.L3NKy.y3zKF') ] ); // for login !!
    await tab.waitForSelector('.sqdOP.yWX7d.y3zKF' , {visible:true});
    await tab.click('.sqdOP.yWX7d.y3zKF');
    await tab.waitForSelector('.aOOlW.HoLwm' , {visible:true});
    await tab.click('.aOOlW.HoLwm');
    await tab.waitForSelector('.XTCLo.x3qfX' , {visible:true});
    await tab.type('.XTCLo.x3qfX' , "pepper_pepcoding");
    await tab.waitForSelector('.-qQT3' , {visible:true});
    await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}), tab.click('.-qQT3') ] ); // for going to pepper page !!
    await tab.waitForSelector('.eLAPa' , {visible:true});
    await tab.click('.eLAPa')
    for(let i=0 ; i<109 ; i++){
        await tab.waitForSelector('.fr66n .wpO6b' , {visible:true});
        await tab.click('.fr66n .wpO6b');
        await tab.click('._65Bje.coreSpriteRightPaginationArrow');
    }
    
  }
  catch(error){
      console.log(error);
  }
})();


