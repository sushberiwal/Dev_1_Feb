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
    }
}

function addSheetHandler() {
  let sheet = document.createElement("div"); 
  sheet.classList.add("sheet");
  sheet.setAttribute("sid" , sheetId);
  sheetId++;
  sheet.textContent = `Sheet ${sheetId}`;
  //<div class="sheet" sid="1">Sheet 2</div>
  sheetsList.append(sheet); // DOM effect
  sheet.addEventListener("click" , switchSheetHandler);
}

