const puppeteer = require("puppeteer");

const id = "nesoj95112@wedbo.net";
const pw = "123456789";

// promisified
let tab;

// opens a browser instance
let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null, // page size reset
  args: ["--start-maximized"], // browser maximize
});
console.log(browserOpenPromise);

browserOpenPromise
  .then(function (browser) {
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;
    let pageOpenPromise = page.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
  })
  .then(function () {
      let idTypedPromise = tab.type("#input-1" , id);
      return idTypedPromise;
  })
  .then(function(){
      let pwTypedPromise = tab.type("#input-2" , pw);
      return pwTypedPromise;
  })
  .then(function(){
      let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
      return loginPromise;
  })
  .then(function(){
      // wait for this selector until it is visible on dom
      let waitPromise = tab.waitForSelector('#base-card-1-link' , {visible:true} );
      return waitPromise;
    //Promise<Pending>
  })
  .then(function(){
      let ipKitClickedPromise = tab.click('#base-card-1-link');
      return ipKitClickedPromise;
  })
  .then(function(){
    let waitPromise = tab.waitForSelector('a[data-attr1="warmup"]' , {visible:true});
    return waitPromise;
  })
  .then(function(){
      let warmupClicked = tab.click('a[data-attr1="warmup"]');
      return warmupClicked;
  })
  .then(function(){
      let waitPromise = tab.waitForSelector('.js-track-click.challenge-list-item' , {visible:true} );
      return waitPromise;
  })
  .then(function(){
      let allATagsPromise = tab.$$('.js-track-click.challenge-list-item');
      return allATagsPromise;
      // Promise<pending>
  })
  .then(function(allATags){
      console.log(allATags);
      // [<a> </a> , <a> </a> , <a> </a> , <a> </a> ];
      let allLinksPromise = [];
      //   [ Promise<pending> , Promise<pending> , Promise<pending> , Promise<pending> ];
      for(let i=0 ; i<allATags.length ; i++){
          let linkPromise = tab.evaluate( function(elem){  return elem.getAttribute("href");  }   ,  allATags[i] );
          allLinksPromise.push(linkPromise);
      }

      let pendingPromise = Promise.all(allLinksPromise);
      return pendingPromise;
  })
  .then(function(allLinks){
      console.log(allLinks);
  })
