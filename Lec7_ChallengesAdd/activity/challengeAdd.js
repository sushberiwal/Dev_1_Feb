const puppeteer = require("puppeteer");
const challenges = require("./challenges");

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
    await waitAndClick('a[data-analytics="NavBarProfileDropDownAdministration"]' , tab);
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {
      visible: true,
    });
    let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {
      visible: true,
    });
    let createChallengeBtn = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function (elem) {
      return elem.getAttribute("href");
    }, createChallengeBtn);
    createChallengeUrl = `https://www.hackerrank.com${createChallengeUrl}`;
    for (let i = 0; i < challenges.length; i++) {
      let newTab = await browser.newPage();
      await addChallenge(newTab , createChallengeUrl , challenges[i]);
    }
  }
  catch(error){
      console.log(error);
  }
})();

function waitAndClick(selector , tab) {
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

//   async function waitAndClick(selector) {
//     try{
//           await tab.waitForSelector(selector, { visible: true });
//           await tab.click(selector);
//     }  
//     catch(error){
//         return error;
//     }
//   }
  

async function addChallenge(newTab, createChallengeUrl , challenge) {
    try{
        await newTab.goto(createChallengeUrl);
        await newTab.waitForSelector('#name' , {visible:true});
        // {
        //     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
        //     "Description": "Question 1",
        //     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
        //     "Input Format": "Integer",
        //     "Constraints": "n <= 10 ^ 9",
        //     "Output Format": "String",
        //     "Tags": "Basics"
        //   }
        let challengeName = challenge["Challenge Name"];
        let description = challenge["Description"];
        let problem = challenge["Problem Statement"];
        let input = challenge["Input Format"];
        let constraints = challenge["Constraints"]
        let output = challenge["Output Format"];
        let tags = challenge["Tags"];
    
        await newTab.type('#name' , challengeName);
        await newTab.type('#preview' , description);
        await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea' , {visible:true});
        await newTab.type('#problem_statement-container .CodeMirror textarea' , problem);
        await newTab.type('#input_format-container .CodeMirror textarea' , input);
        await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
        await newTab.type('#output_format-container .CodeMirror textarea' , output);
        await newTab.type('#tags_tag' , tags);
        await newTab.keyboard.press("Enter");
        await newTab.click('.save-challenge.btn.btn-green');
        await newTab.close();
    }
    catch(error){
        return error;
    }
}
