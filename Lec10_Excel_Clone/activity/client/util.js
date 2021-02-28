function solve(formula , selfCellObject){
    // me -> B1

    // "( A1 + A2 )"
    let formulaComp = formula.split(" ");
    // [ "(" , "A1" , "+" , "A2" , ")" ];
    for(let i=0 ; i<formulaComp.length ; i++){
        let fComp = formulaComp[i];
        // "A1"
        if(fComp[0] >= "A" && fComp[0] <= "Z" ){
            // valid component
            // "A1" => get value of A1
            // access "A1" cellObject
            // "A1" => rowId and colId
            let {rowId , colId} = getRowIdColId(fComp);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;

            if(selfCellObject){
                // push yourself into parent's childrens
                cellObject.childrens.push( selfCellObject.name );
                selfCellObject.parents.push(  cellObject.name  );
            }

            formula = formula.replace(fComp , value);
        }
    }
    
    // formula = ( 10 + 20 ); =>  Infix evaluation
    let value = eval(formula); 
    return value;
}

function deleteFormula(cellObject){
    cellObject.formula="";
    for(let i=0 ; i<cellObject.parents.length ; i++){
        let parentName = cellObject.parents[i];
        let {rowId , colId} = getRowIdColId(parentName);
        let parentCellObject = db[rowId][colId];
        let filteredChildrens = parentCellObject.childrens.filter(  function(child){
            return child != cellObject.name;
        })
        parentCellObject.childrens = filteredChildrens;
    }
    cellObject.parents = [];
}

function updateChildrens(cellObject){
    let childrens = cellObject.childrens;
    for(let i=0 ; i<childrens.length ; i++){
        let childName = childrens[i];
        let {rowId , colId} = getRowIdColId(childName);
        let childCellObject = db[rowId][colId];
        //B1
        let updatedValue = solve(childCellObject.formula);
        // ui set
        let childDiv = document.querySelector(`div[rid="${rowId}"][cid="${colId}"]`);
        childDiv.textContent = updatedValue;
        // db set
        childCellObject.value = updatedValue;
        updateChildrens(childCellObject);
    }
}

function getCellObject(elem){
    let rowId = elem.getAttribute("rid");
    let colId = elem.getAttribute("cid");
    return db[rowId][colId];
}

function getRowIdColId(address){
    // B25 => rowid(24) , colid(1)
    let rowId = Number(address.substring(1)) - 1;
    let colId = Number(address.charCodeAt(0)) - 65 ;
    return {rowId , colId};
}