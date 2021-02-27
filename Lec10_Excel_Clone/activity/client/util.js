function solve(formula){
    // "( 10 + 20 )"
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
            //10
            formula = formula.replace(fComp , value);
        }
    }
    
    // formula = ( 10 + 20 ); =>  Infix evaluation
    let value = eval(formula); 
    return value;
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