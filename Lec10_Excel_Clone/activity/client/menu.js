let file = document.querySelector(".file");
let home = document.querySelector(".home");
let fileOptions = document.querySelector(".file-menu-options");
let homeOptions = document.querySelector(".home-menu-options");
let newBtn = document.querySelector(".new");
let openBtn = document.querySelector(".open");
let saveBtn = document.querySelector(".save");

let dialog = require("electron").remote.dialog;
let fs = require("fs");

file.addEventListener("click", function () {
  if (!file.classList.contains("active-menu")) {
    home.classList.remove("active-menu");
    file.classList.add("active-menu");
    fileOptions.classList.remove("hide");
    homeOptions.classList.add("hide");
  }
});
home.addEventListener("click", function () {
  if (!home.classList.contains("active-menu")) {
    file.classList.remove("active-menu");
    home.classList.add("active-menu");
    homeOptions.classList.remove("hide");
    fileOptions.classList.add("hide");
  }
});

newBtn.addEventListener("click", function () {
  //1. sheets ui se gayab
  let defaultSheet = `<div class="sheet active-sheet" sid="0">Sheet 1</div>`;
  sheetsList.innerHTML = defaultSheet;
  let sheet = document.querySelector(".sheet");
  sheet.addEventListener("click", switchSheetHandler);

  // 2. manage sheets db
  sheetId = 1;
  sheetsDB = [];
  initDB();
  db = sheetsDB[0];

  //3. init UI
  initUI();
});

openBtn.addEventListener("click", function () {
  // console.log("open btn clicked !!");
  let paths = dialog.showOpenDialogSync();
  let path = paths[0];
  let savedDB = fs.readFileSync(path);
  savedDB = JSON.parse(savedDB);
  // set DB
  sheetsDB = savedDB;
  db = sheetsDB[0];

  // set sheets according to sheetsDB
  sheetId = 1;
  for (let i = 0; i < sheetsDB.length; i++) {
    if (i == 0) {
      let defaultSheet = `<div class="sheet active-sheet" sid="0">Sheet 1</div>`;
      sheetsList.innerHTML = defaultSheet;
      let sheet = document.querySelector(".sheet");
      sheet.addEventListener("click", switchSheetHandler);
    } else {
      let sheet = document.createElement("div");
      sheet.classList.add("sheet");
      sheet.setAttribute("sid", sheetId);
      sheetId++;
      sheet.textContent = `Sheet ${sheetId}`;
      sheetsList.append(sheet);
      sheet.addEventListener("click", switchSheetHandler);
    }
  }
  // set UI
  setUI();
});

saveBtn.addEventListener("click", function () {
  let path = dialog.showSaveDialogSync();
  console.log(path);
  if (path) {
    fs.writeFileSync(path, JSON.stringify(sheetsDB));
    alert("Sheets Saved !");
  }
});
