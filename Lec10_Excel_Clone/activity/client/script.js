let allCells = document.querySelectorAll(".cell");
let addressBox = document.querySelector("#address");
// console.log(allCells);



for(let i=0 ; i<allCells.length ; i++){
    // [ <div> </div> , <div> </div> , <div> </div> , <div> </div> ]
    allCells[i].addEventListener("click" , function(event){        
        let clickedCell = event.target;
        let rowId = Number(clickedCell.getAttribute("rid"));
        let colId = Number(clickedCell.getAttribute("cid"));
        // console.log(rowId , colId);
        // rowId = 1 , colId = 1 => B2
        let address = String.fromCharCode(65+colId) + (rowId+1) ;
        console.log(address);
        // input type element
        addressBox.value = address;
    })
}

