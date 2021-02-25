// main.js file create
/// terminal location => Excel_clone/activity
// npm init -y 
// npm i electron
// add "start":"electron ." in scripts(package.json)

const { app, BrowserWindow } = require('electron')

let appLaunchPromise = app.whenReady();

appLaunchPromise.then(function() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true // node enabled 
      }
    })
    win.loadFile('client/index.html').then(function(){
      win.maximize(); // win will maximize after loadFile
      win.webContents.openDevTools(); // win will open with dev tools
    })
  }
  );

