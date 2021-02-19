const puppeteer = require("puppeteer");

const id = "nesoj95112@wedbo.net";
const pw = "123456789";

// promisified
let tab;
let idx;
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
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
  })
  .then(function () {
    let pwTypedPromise = tab.type("#input-2", pw);
    return pwTypedPromise;
  })
  .then(function () {
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return loginPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allATagsPromise;
    // Promise<pending>
  })
  .then(function (allATags) {
    // console.log(allATags);
    // [<a> </a> , <a> </a> , <a> </a> , <a> </a> ];
    let allLinksPromise = [];
    //   [ Promise<pending> , Promise<pending> , Promise<pending> , Promise<pending> ];
    for (let i = 0; i < allATags.length; i++) {
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      allLinksPromise.push(linkPromise);
    }
    let pendingPromise = Promise.all(allLinksPromise);
    return pendingPromise;
  })
  .then(function (allLinks) {
    let oneQuesSolvedPromise = solveQuestion(allLinks[0]);
    return oneQuesSolvedPromise;
  })
  .then(function () {
    console.log("One ques solved !");
  })
  .catch(function (error) {
    console.log(error);
  });

function solveQuestion(qLink) {
  return new Promise(function (resolve, reject) {
    let gotoPromise = tab.goto("https://www.hackerrank.com" + qLink);
    gotoPromise
      .then(function () {
        let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
        return waitAndClickPromise;
      })
      .then(function () {
        let waitPromise = tab.waitForSelector('.hackdown-content h3' , {visible:true});
        return waitPromise;
      })
      .then(function(){
        let allCodeNamesPromise = tab.$$('.hackdown-content h3');
        return allCodeNamesPromise; //Promise<Pending>
      })
      .then(function(allCodeElements){
        // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3> ]
        // textContent
        let codeNamesPromise = [];
        // [Promise<pending> , Promise<pending> , Promise<pending> ];

        for(let i=0 ; i<allCodeElements.length ; i++){
          let codeNamePromise = tab.evaluate( function(elem){ return elem.textContent;    }   , allCodeElements[i] );
          codeNamesPromise.push(codeNamePromise);
        }
        let pendingPromise =Promise.all(codeNamesPromise);
        return pendingPromise; // Promise<pending>
      })
      .then(function(allCodeNames){
        // [ "C++" , "Python" , "Java" ];
        for(let i=0 ; i<allCodeNames.length ; i++){
          if(allCodeNames[i] == "C++"){
            idx = i;
            break;
          }
        }
        let allCodeDivPromise = tab.$$(".hackdown-content .highlight");
        return allCodeDivPromise;
      }).then(function(allCodeDiv){
        // [ <div class="highlight">askjjfa</div> , <div class="highlight">askjjfa</div> , <div class="highlight">askjjfa</div>];
        let codeDiv = allCodeDiv[idx];
        let codePromise = tab.evaluate( function(elem){ return elem.textContent;  } , codeDiv);
        return codePromise;
      })
      .then(function(code){
        console.log(code);
      })
  });
}

function waitAndClick(selector) {
  return new Promise(function (resolve, reject) {
    // resolve will call the scb
    // reject will call the fcb
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(function () {
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function () {
        // wait bhi click bhi
        resolve();
      })
      .catch(function (error) {
        // euther wait fail or click fail
        reject(error);
      });
  });
}
