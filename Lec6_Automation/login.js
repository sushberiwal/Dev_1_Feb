const puppeteer = require("puppeteer");

const id = "nesoj95112@wedbo.net";
const pw = "123456789";

// promisified
let tab;
let idx;
let gCode;
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
    let waitPromise = tab.waitForSelector("#input-1", {visible:true});
    return waitPromise;
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
    for(let i=1 ; i<allLinks.length ; i++){
      oneQuesSolvedPromise = oneQuesSolvedPromise.then(function(){
        let nextQuesSolvePromise = solveQuestion(allLinks[i]);
        return nextQuesSolvePromise;
      })
    }
    return oneQuesSolvedPromise;
  })
  .then(function(){
    console.log("All Questions solved !!!! ");
  })
  .catch(function (error) {
    console.log(error);
  });

  function getCode(){
    return new Promise(function(resolve , reject){
      let waitPromise = tab.waitForSelector('.hackdown-content h3' , {visible:true});
      waitPromise.then(function(){
        let allCodeNamesPromise = tab.$$('.hackdown-content h3');
        return allCodeNamesPromise; //Promise<Pending>
      }).then(function(allCodeElements){
        // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3> ]
        // textContent
        let codeNamesPromise = [];
        // [Promise<pending> , Promise<pending> , Promise<pending>];

        for(let i=0 ; i<allCodeElements.length ; i++){
          let codeNamePromise = tab.evaluate( function(elem){ return elem.textContent;    }   , allCodeElements[i] );
          codeNamesPromise.push(codeNamePromise);
        }
        let pendingPromise = Promise.all(codeNamesPromise);
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
        gCode = code;
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }

  function pasteCode(){
    return new Promise(function(resolve , reject){
      let waitAndClickPromise = waitAndClick('.custom-input-checkbox');
      waitAndClickPromise.then(function(){
        let codeTypePromise = tab.type('.custominput' , gCode);
        return codeTypePromise;
      }).then(function(){
        let ctrlDownPromise = tab.keyboard.down("Control");
        return ctrlDownPromise;
      })
      .then(function(){
        let aKeyPromise = tab.keyboard.press("A");
        return aKeyPromise;
      })
      .then(function(){
        let xKeyPromise = tab.keyboard.press("X");
        return xKeyPromise;
      })
      .then(function(){
        let clickPromise = tab.click('.monaco-scrollable-element.editor-scrollable.vs');
        return clickPromise;
      })
      .then(function(){
        let aKeyPromise = tab.keyboard.press("A");
        return aKeyPromise;
      }).then(function(){
        let vKeyPromise = tab.keyboard.press("V");
        return vKeyPromise;
      }).then(function(){
        let ctrlUpPromise = tab.keyboard.up("Control");
        return ctrlUpPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }

  function handleLockBtn(){
    return new Promise(function(resolve , reject){
      let waitLockPromise = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
      waitLockPromise.then(function(){
        let lockBtnClickedPromise = tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        return lockBtnClickedPromise;
      })
      .then(function(){
        //lock btn found and clicked
        console.log("lock btn found and clicked");
        resolve();
      })
      .catch(function(error){
        //lock btn not found !!
        console.log("lock btn not found !!");
        resolve();
      })
    })
  }


function solveQuestion(qLink) {
  return new Promise(function (resolve, reject) {
    let gotoPromise = tab.goto("https://www.hackerrank.com" + qLink);
    gotoPromise
      .then(function () {
        let clickPromise = waitAndClick('div[data-attr2="Editorial"]');
        return clickPromise;
      })
      .then(function(){
        let lockBtnPromise = handleLockBtn();
        return lockBtnPromise;
      })
      .then(function(){
        let codePromise = getCode();
        return codePromise;
      })
      .then(function(){
        let clickPromise = tab.click('div[data-attr2="Problem"]');
        return clickPromise;
      })
      .then(function(){
        let pasteCodePromise = pasteCode();
        return pasteCodePromise;
      }).then(function(){
        let submitPromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
        return submitPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
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
