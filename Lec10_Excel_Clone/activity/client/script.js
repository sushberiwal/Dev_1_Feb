let allCells = document.querySelectorAll(".cell");
let addressBox = document.querySelector("#address");

// last selected cell
let lsc; 


for(let i=0 ; i<allCells.length ; i++){
    allCells[i].addEventListener("click" , onClickHandler);
    allCells[i].addEventListener("blur" , onBlurHandler);
}

function onClickHandler(event){        
    let clickedCell = event.target;
    let rowId = Number(clickedCell.getAttribute("rid"));
    let colId = Number(clickedCell.getAttribute("cid"));
    // console.log(rowId , colId);
    // rowId = 1 , colId = 1 => B2
    let address = String.fromCharCode(65+colId) + (rowId+1) ;
    console.log(address);
    // input type element
    addressBox.value = address;
}
function onBlurHandler(e){
    let blurredCell = e.target;
    lsc = blurredCell;
    let value = blurredCell.textContent;
    let cellObject = getCellObject(lsc);
    cellObject.value = value;
    console.log(db);
}


// formula 
let formulaBox = document.querySelector("#formula");

formulaBox.addEventListener("blur" , function(){
    let formula = formulaBox.value;
    // falsy values => undefined , false , "" , 0 , null
    if(formula){
        // ( A1 + A2 )
        let value = solve(formula);
        // set UI
        lsc.textContent = value;
        // set DB
        let cellObject = getCellObject(lsc);
        cellObject.value = value+"";
    }
})