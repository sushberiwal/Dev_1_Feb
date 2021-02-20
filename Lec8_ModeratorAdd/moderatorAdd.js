const puppeteer = require("puppeteer");

const id = "nesoj95112@wedbo.net";
const pw = "123456789";

// IIFE => Immediately Invoked Function Expressions
(async function () {
  try{

      let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null, // page size reset
      args: ["--start-maximized"], // browser maximize
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.waitForSelector("#input-1", { visible: true });
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {
      visible: true,
    });
    let dropDown = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await dropDown.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}) ,tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]); 
    
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {
      visible: true,
    });
    let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallengeLi = bothLis[1];
    manageChallengeLi.click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {
      visible: true,
    });
    // reach challenge page !!
    
    
  }
  catch(error){
      console.log(error);
  }
})();


