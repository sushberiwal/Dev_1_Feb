let addSheetBtn = document.querySelector(".add-sheet");
let sheetsList = document.querySelector(".sheets-list");
let defaultSheet = document.querySelector(".sheet"); 
let sheetId = 1;

addSheetBtn.addEventListener("click", addSheetHandler);
defaultSheet.addEventListener("click" , switchSheetHandler);

function switchSheetHandler(e){
    let clickedSheet = e.target;
    if(!clickedSheet.classList.contains("active-sheet")){
        let currentActiveSheet = document.querySelector(".active-sheet");
        currentActiveSheet.classList.remove("active-sheet");
        clickedSheet.classList.add("active-sheet");
        // set DB
        let sid = clickedSheet.getAttribute("sid");
        db = sheetsDB[sid];
        // set UI
        setUI();
        addressBox.value = "";
        formulaBox.value = "";
    }
}

function addSheetHandler() {
  initDB(); // adds a new db to sheetsDB
  let sheet = document.createElement("div"); 
  sheet.classList.add("sheet");
  sheet.setAttribute("sid" , sheetId);
  sheetId++;
  sheet.textContent = `Sheet ${sheetId}`;
  sheetsList.append(sheet);
  sheet.addEventListener("click" , switchSheetHandler);
  console.log(sheetsDB);
}

