let allCells = document.querySelectorAll(".cell");
let addressBox = document.querySelector("#address");
let formulaBox = document.querySelector("#formula");
// last selected cell
let lsc; 

for(let i=0 ; i<allCells.length ; i++){
    allCells[i].addEventListener("click" , onCellClickHandler);
    allCells[i].addEventListener("blur" , onCellBlurHandler);
}

formulaBox.addEventListener("blur" , onFormulaBlurHandler);

function onCellClickHandler(e){        
    let clickedCell = e.target;
    let cellObject = getCellObject(clickedCell);
    // input type element
    addressBox.value = cellObject.name;
    formulaBox.value = cellObject.formula;
}
function onCellBlurHandler(e){
    let blurredCell = e.target;
    lsc = blurredCell;
    let value = blurredCell.textContent; 
    let cellObject = getCellObject(lsc);
    // db set
    cellObject.value = value;

    // update childrens
    updateChildrens(cellObject);
}
function onFormulaBlurHandler(){
    let formula = formulaBox.value;
    // falsy values => undefined , false , "" , 0 , null
    if(formula){
        let cellObject = getCellObject(lsc);
        // ( A1 + A2 )
        let value = solve(formula , cellObject);
        // set UI
        lsc.textContent = value;
        // set DB
        cellObject.formula = formula;
        cellObject.value = value+"";
    }
}
