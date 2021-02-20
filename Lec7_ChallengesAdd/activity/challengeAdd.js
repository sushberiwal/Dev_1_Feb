const puppeteer = require("puppeteer");

const id = "nesoj95112@wedbo.net";
const pw = "123456789";


// IIFE => Immediately Invoked Function Expressions
(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null, // page size reset
        args: ["--start-maximized"], // browser maximize
      });
      let pages = await browser.pages();
      let tab = pages[0];
      await tab.goto("https://www.hackerrank.com/auth/login");
      await tab.waitForSelector("#input-1", {visible:true});
      await tab.type("#input-1", id);
      await tab.type("#input-2", pw);
      await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})();